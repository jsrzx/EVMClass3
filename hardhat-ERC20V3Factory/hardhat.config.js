require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config()

let ALCHEMY_GOERLI_KEY = process.env.ALCHEMY_GOERLI_KEY || ''
let ALCHEMY_ARB_GOERLI_KEY = process.env.ALCHEMY_ARB_GOERLI_KEY || ''
let PRIVATE_KEY = process.env.PRIVATE_KEY || ''
let ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ''

module.exports = {
  // 配置编译器版本
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    arbgoerli: {
      url: `https://arb-goerli.g.alchemy.com/v2/${ALCHEMY_ARB_GOERLI_KEY}`,
      accounts: [PRIVATE_KEY]
    },
  },
  // 配置自动化verify相关
  etherscan: {
    apiKey: {
      arbitrumGoerli: ETHERSCAN_API_KEY
    }
  },
};
