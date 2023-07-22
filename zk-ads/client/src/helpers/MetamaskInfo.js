import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

const MetamaskInfo = () => {
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    async function getWalletAddress() {
      // Check if Metamask is installed and accessible
      if (window.ethereum) {
        // Request access to the user's accounts
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts"
        });

        // Create a custom ethers.js provider using Metamask
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        // Get the connected account's address
        const signer = provider.getSigner();
        const address = await signer.getAddress();

        // Set the wallet address in the state
        setWalletAddress(address);
      } else {
        console.error("Metamask not detected.");
      }
    }

    getWalletAddress();
  }, []);

  return (
    <div>
      {walletAddress ? (
        <p>Your Metamask wallet address: {walletAddress}</p>
      ) : (
        <p>Metamask not connected.</p>
      )}
    </div>
  );
};

export default MetamaskInfo;
