// Navbar.js
import React, { useEffect, useState, useMemo } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Ethereum from "../helpers/Ethereum";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const [metamaskLoggedIn, setMetamaskLoggedIn] = useState(false);
  const [worldcoinLoggedIn, setWorldcoinLoggedIn] = useState(false);
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [wallet_id, setWalletId] = useState("");

    // Use useMemo to calculate wallet_id based on window.ethereum
    const memoizedWalletId = useMemo(() => {
      if (wallet_id === "" && window.ethereum) {
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((accounts) => {
            setWalletId(accounts[0]);
          })
          .catch((error) => {
            console.error("Error fetching wallet ID:", error);
          });
      }
      return wallet_id;
    }, [wallet_id]);

  useEffect(() => {
    // Check Metamask login status
    if (Ethereum.accounts.length > 0 && isAuthenticated) {
      setMetamaskLoggedIn(true);
    } else {
      setMetamaskLoggedIn(false);
    }

    // Check Worldcoin login status (you may need to implement this logic)
    // For this example, I assume a variable worldcoinLoggedIn to determine login status
    // Replace this with your actual logic to check Worldcoin login status
    // Example: setWorldcoinLoggedIn(isWorldcoinLoggedIn);
  }, [isAuthenticated]);

  const handleMetamaskLogin = async () => {
    await Ethereum.connect();
    if (Ethereum.accounts.length > 0) {
      setMetamaskLoggedIn(true);
    }
  };

  const handleWorldcoinLogin = async () => {
    // Implement your logic to log in with Worldcoin
    // For this example, I'm just setting worldcoinLoggedIn to true
    // Replace this with your actual logic
    // Example: await authenticateWorldcoin();
    setWorldcoinLoggedIn(true);
  };

  const handleLogout = async () => {
    // Implement your logic to log out
    // For this example, I'm just setting metamaskLoggedIn and worldcoinLoggedIn to false
    // Replace this with your actual logic
    // Example: await logout();
    setMetamaskLoggedIn(false);
    setWorldcoinLoggedIn(false);
  };

  

  return (
    <AppBar position="static" color="inherit">
      <Toolbar>
        <Typography variant="h2" component="h1">
          ZAP the ZK-Ads Platform 🚀
        </Typography>
        <div style={{ marginLeft: "auto" }}>
          {metamaskLoggedIn ? (
            <Button color="inherit" onClick={handleLogout}>
            Connected with {memoizedWalletId || "Please connect MetaMask"}
            </Button>
          ) : (
            <Button color="inherit" onClick={handleMetamaskLogin}>
              Login with Metamask 
            </Button>
          )}
          {worldcoinLoggedIn ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout from Worldcoin 
            </Button>
          ) : (
            <Button color="inherit" onClick={handleWorldcoinLogin}>
              Login with Worldcoin 
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
