import { ethers } from "ethers";
import abi from './ABI'

const Ethereum = {
  provider: null,
  signer: null,
  accounts: [],
  connect: async () => {
    try {
      Ethereum.provider = new ethers.providers.Web3Provider(window.ethereum);
      Ethereum.signer = await Ethereum.provider.getSigner();
      await Ethereum.getAccounts();
      if (Ethereum.provider && Ethereum.signer && Ethereum.accounts.length > 0)
        localStorage.setItem("connected", "true");
    } catch (err) {
      console.log(err);
      alert("Log into Metamask first, then try Login.");
    }
  },
  getAccounts: async () => {
    Ethereum.accounts = await Ethereum.provider.send("eth_requestAccounts", []);
  },
  genAd: async (adId, cid, url, category) => {
    let signer = await Ethereum.provider.getSigner()
    let obj = new ethers.Contract("0xFBB15D49bcD997E361C8E34ed58d19a1C27A5193", abi.ZAP, signer);
    try {
        await obj.functions.createAd(adId, cid, url, category)
        return true
    } catch (err) {
        console.log(err)
        return false
    }
  }
};

export default Ethereum;
