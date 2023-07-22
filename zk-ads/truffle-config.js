const HDWalletProvider = require('@truffle/hdwallet-provider');

// OVERRIDE THIS WITH YOUR OWN MNEMONIC, obviously...
const mnemonic = "neither hockey kind spend someone dolphin piece company then inside speak cash"; 
const polygonRpcUrl = "https://rpc-mumbai.maticvigil.com"; // Polygon (Matic) Testnet RPC URL

module.exports = {
  networks: {
    polygon: {
      provider: () => new HDWalletProvider(mnemonic, polygonRpcUrl),
      network_id: 80001, // Polygon Mumbai testnet network id
      gasPrice: 5000000000, // 5 gwei (in wei)
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },
};
