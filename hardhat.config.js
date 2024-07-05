require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
const Sepolia_RPC_URL = process.env.SEPOLIA_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
    solidity: "0.8.24",
    networks: {
        localhost: {
            url: "http://127.0.0.1:8545" // URL of the local Hardhat node
        },
        sepolia: {
            url: Sepolia_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 11155111,
        },
    },
};