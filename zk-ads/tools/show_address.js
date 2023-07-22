import { HDNodeWallet } from "ethers";

const mnemonic = "neither hockey kind spend someone dolphin piece company then inside speak cash"; 

const wallet = HDNodeWallet.fromPhrase(mnemonic);

console.log('Wallet address:', wallet.address);
console.log('Wallet private key:', wallet.privateKey);
