import React, { createContext, useContext, useEffect, useState } from 'react';
import Ethereum from '../helpers/Ethereum';

const MetamaskAuthContext = createContext();

export function MetamaskAuthProvider({ children }) {
  const [metamaskLoggedIn, setMetamaskLoggedIn] = useState(false);

  useEffect(() => {
    async function connectMetamask() {
      await Ethereum.connect();
      if (Ethereum.accounts.length > 0) {
        setMetamaskLoggedIn(true);
      }
    }

    connectMetamask();
  }, []);

  return (
    <MetamaskAuthContext.Provider value={{ metamaskLoggedIn }}>
      {children}
    </MetamaskAuthContext.Provider>
  );
}

export function useMetamaskAuth() {
  return useContext(MetamaskAuthContext);
}
