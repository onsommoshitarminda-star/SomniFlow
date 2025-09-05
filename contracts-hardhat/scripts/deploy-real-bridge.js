const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Deploying RealBridge contract...");

  // Get the contract factory
  const RealBridge = await ethers.getContractFactory("RealBridge");

  // Deploy the contract
  const realBridge = await RealBridge.deploy();
  await realBridge.waitForDeployment();

  const address = await realBridge.getAddress();
  console.log("✅ RealBridge deployed to:", address);

  // Add some initial liquidity (0.05 ETH)
  const initialLiquidity = ethers.parseEther("0.05");
  console.log("💰 Adding initial liquidity:", ethers.formatEther(initialLiquidity), "ETH");
  
  const addLiquidityTx = await realBridge.addLiquidity({ value: initialLiquidity });
  await addLiquidityTx.wait();
  console.log("✅ Initial liquidity added");

  // Verify deployment
  const balance = await realBridge.getBalance();
  console.log("💎 Bridge contract balance:", ethers.formatEther(balance), "ETH");

  // Somnia testnet (50312)
  try {
    const somniaConfig = await realBridge.bridgeConfigs(50312);
    console.log("🔧 Bridge configuration for Somnia (dest=50312):");
    console.log("- Min amount:", ethers.formatEther(somniaConfig.minAmount), "ETH");
    console.log("- Max amount:", ethers.formatEther(somniaConfig.maxAmount), "ETH");
    console.log("- Fee rate:", somniaConfig.feeRate / 100, "%");
    console.log("- Enabled:", somniaConfig.enabled);
  } catch (e) {
    console.log("ℹ️ Somnia bridge config not set or unreadable on this chain.");
  }

  return {
    address,
    contract: realBridge
  };
}

// Run deployment
if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

module.exports = { main };