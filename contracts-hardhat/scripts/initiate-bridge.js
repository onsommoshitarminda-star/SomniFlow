// Minimal bridge init script (Sepolia -> Somnia)
// 最小桥接发起脚本（从 Sepolia 发起到 Somnia）

require('dotenv').config({ path: './.env.local' });
const { ethers } = require('hardhat');
const fs = require('fs');
const path = require('path');

async function main() {
  // 读取已部署地址表 / read deployed addresses
  const addressesPath = path.join(__dirname, '..', '..', 'contracts', 'deployed-addresses.json');
  const altPath = path.join(__dirname, '..', '..', 'deployed-addresses.json');
  const resolvedPath = fs.existsSync(addressesPath) ? addressesPath : altPath;
  const addr = JSON.parse(fs.readFileSync(resolvedPath, 'utf-8'));

  const sepoliaBridge = addr.sepolia?.RealBridge;
  if (!sepoliaBridge) {
    throw new Error('Missing Sepolia RealBridge address in contracts/deployed-addresses.json');
  }

  // 读取参数：接收人与金额 / read recipient and amount
  const [signer] = await ethers.getSigners();
  const recipient = process.env.BRIDGE_RECIPIENT || signer.address; // 默认发给自己 / default self
  const amountEth = process.env.BRIDGE_AMOUNT || '0.01'; // 默认 0.01 ETH / default 0.01 ETH

  const destChainId = 50312; // Somnia 测试网 / Somnia testnet
  const destToken = 'STT'; // 仅用于记录展示 / for display only

  console.log('📨 Initiating bridge on Sepolia...');
  console.log('🔗 RealBridge:', sepoliaBridge);
  console.log('👤 Recipient:', recipient);
  console.log('💰 Amount (ETH):', amountEth);
  console.log('🎯 Dest ChainId:', destChainId, 'Token:', destToken);

  const bridge = await ethers.getContractAt('RealBridge', sepoliaBridge, signer);

  const tx = await bridge.initiateBridge(
    destChainId,
    destToken,
    recipient,
    { value: ethers.parseEther(amountEth) }
  );
  console.log('📝 Tx sent:', tx.hash);

  const receipt = await tx.wait();
  console.log('✅ Confirmed in block:', receipt.blockNumber);
  console.log('ℹ️ Keep this tx hash for relaying on Somnia.');
}

if (require.main === module) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}

module.exports = { main };

