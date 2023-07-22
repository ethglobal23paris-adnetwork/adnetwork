import { Wallet } from "ethers";
import dotenv from "dotenv";
dotenv.config();

const addr = Wallet.createRandom().privateKey;
console.log("Wallet: " + addr);
