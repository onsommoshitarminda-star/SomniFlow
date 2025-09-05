// Minimal relay script to complete bridge on Somnia
// 最小管理员中继脚本：在 Somnia 完成桥接

require('dotenv').config({ path: './.env.local' });
const { ethers } = require('hardhat');
const fs = require('fs');
const path = require('path');

async function main() {
  // 读取部署地址 / load deployed addresses
  const addressesPath = path.join(__dirname, '..', '..', 'contracts', 'deployed-addresses.json');
  const altPath = path.join(__dirname, '..', '..', 'deployed-addresses.json');
  const resolvedPath = fs.existsSync(addressesPath) ? addressesPath : altPath;
  const addr = JSON.parse(fs.readFileSync(resolvedPath, 'utf-8'));

  const somniaBridge = addr.somnia_testnet?.RealBridge;
  if (!somniaBridge) {
    throw new Error('Missing Somnia RealBridge address in contracts/deployed-addresses.json');
  }

  // 从环境变量读取必要信息 / read required info from env
  const recipient = process.env.BRIDGE_RECIPIENT;
  const amountEth = process.env.BRIDGE_AMOUNT;
  const bridgeId = process.env.BRIDGE_ID || ethers.id(`${Date.now()}_${Math.random()}`);

  if (!recipient || !amountEth) {
    throw new Error('Please set BRIDGE_RECIPIENT and BRIDGE_AMOUNT in .env.local');
  }

  console.log('🚚 Completing bridge on Somnia...');
  console.log('🔗 RealBridge:', somniaBridge);
  console.log('👤 Recipient:', recipient);
  console.log('💰 Amount (ETH):', amountEth);
  console.log('🧩 BridgeId:', bridgeId);

  const [operator] = await ethers.getSigners();
  const bridge = await ethers.getContractAt('RealBridge', somniaBridge, operator);

  const tx = await bridge.completeBridge(
    bridgeId,
    recipient,
    ethers.parseEther(amountEth)
  );
  console.log('📝 Tx sent:', tx.hash);

  const receipt = await tx.wait();
  console.log('✅ Completed in block:', receipt.blockNumber);
}

if (require.main === module) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}

module.exports = { main };

