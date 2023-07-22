import { Wallet } from "ethers";

function generateMnemonic() {
  const mnemonic = Wallet.createRandom().mnemonic.phrase;
  return mnemonic;
}

const mnemonic = generateMnemonic();
console.log('12-word mnemonic phrase:', mnemonic);
