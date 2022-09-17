require("dotenv").config();

require("@nomicfoundation/hardhat-toolbox");

require("./tasks/mint");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    hardhat: {
      chainId: 1337, // We set 1337 to make interacting with MetaMask simpler
    },
    goerli: {
      chainId: 5,
      url: `https://goerli.infura.io/v3/${process.env.INFURA_ID}`,
      accounts: {
        mnemonic: process.env.GOERLI_SEED,
      },
    },
  },
};
