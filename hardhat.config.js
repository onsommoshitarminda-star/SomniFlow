require("@nomicfoundation/hardhat-ethers");
require("dotenv").config({ path: "./.env.local" });

// Normalize PRIVATE_KEY from .env.local so it can be either with or without '0x' prefix
// 兼容 .env.local 中不带 '0x' 前缀的私钥：如果没有前缀则自动补上 '0x'
const normalizePrivateKey = (pk) => {
  if (!pk) return undefined; // 未提供则返回 undefined / if not provided
  const trimmed = pk.trim(); // 去掉首尾空格 / trim spaces
  return trimmed.startsWith('0x') ? trimmed : `0x${trimmed}`;
};

const PRIVATE_KEY = normalizePrivateKey(process.env.PRIVATE_KEY);

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  paths: {
    sources: "./contracts-hardhat"
  },
  networks: {
    sepolia: {
      url: "https://eth-sepolia.public.blastapi.io",
      // 使用环境变量私钥；自动补全 '0x' 前缀 / use env private key; auto add '0x' if missing
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : []
    },
    somnia: {
      url: "https://dream-rpc.somnia.network",
      // 使用环境变量私钥；自动补全 '0x' 前缀 / use env private key; auto add '0x' if missing
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : []
    }
  },
  etherscan: {
    apiKey: {
      somnia: "string", 
    },
    customChains: [
      {
        network: "somnia",
        chainId: 50312,
        urls: {
          apiURL: "https://shannon-explorer.somnia.network/api",
          browserURL: "https://shannon-explorer.somnia.network",
        },
      }
    ]
  }
};