import { ethers } from "ethers";
import abi from "./ABI";

const Metamask = {
  provider: null,
  signer: null,
  accounts: [],
  isLoggedIn: () => {
    return localStorage.getItem("connected") === "true";
  },
  connect: async () => {
    try {
      if (Metamask.isLoggedIn()) {
        return;
      }
      if (typeof window.ethereum !== "undefined") {
        Metamask.provider = new ethers.providers.Web3Provider(window.ethereum);
        await Metamask.provider.send("eth_requestAccounts", []);
        Metamask.signer = Metamask.provider.getSigner();
        await Metamask.getAccounts();
        if (
          Metamask.provider &&
          Metamask.signer &&
          Metamask.accounts.length > 0
        ) {
          localStorage.setItem("connected", "true");
          await Metamask.getAccounts();
        }
      } else {
        alert(
          "Please install and enable the MetaMask extension to use this application."
        );
      }
    } catch (err) {
      console.log(err);
      alert("Error connecting to MetaMask");
    }
  },
  getAccounts: async () => {
    Metamask.accounts = await Metamask.provider.listAccounts();
  },
  genAd: async (adId, cid, url, category) => {
    let obj = new ethers.Contract(
      "0xFBB15D49bcD997E361C8E34ed58d19a1C27A5193",
      abi.ZAP,
      Metamask.signer
    );
    try {
      await obj.createAd(adId, cid, url, category);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
};

export default Metamask;
