import { MetaMaskSDK } from '@metamask/sdk';
import { ethers } from 'ethers';

const options = {
    injectProvider: true,
  };

const mmsdk = new MetaMaskSDK({
    useDeeplink: false,
    autoConnect: {
        enable: true
    },
    dappMetadata: {
        name: "whatever",
    },
    logging: {
        developerMode: true,
    },
    storage: {
        enabled: true
    }
});


const Ethereum = {
    provider: null,
    signer: null,
    accounts: [],
    connect: async () => {
        Ethereum.provider = new ethers.providers.Web3Provider(window.ethereum)
        Ethereum.signer = await Ethereum.provider.getSigner()
        await Ethereum.getAccounts()
        if (Ethereum.provider && Ethereum.signer && Ethereum.accounts.length > 0) localStorage.setItem('connected', 'true');
    },
    getAccounts: async () => {
        Ethereum.accounts = await Ethereum.provider.send("eth_requestAccounts", [])
    },
}

export default Ethereum
