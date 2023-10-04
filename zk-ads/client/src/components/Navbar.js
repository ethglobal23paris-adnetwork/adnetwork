// Navbar.js
import React, { useState, useMemo } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Metamask from "../helpers/Metamask";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const [wallet_id, setWalletId] = useState("");
  const {
    isAuthenticated: worldcoinAuthenticated,
    loginWithRedirect: worldcoinLogin,
  } = useAuth0();

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

  const handleWorldcoinLogin = async () => {
    await worldcoinLogin();
  };

  return (
    <AppBar position="static" color="inherit">
      <Toolbar>
        <Typography variant="h2" component="h1">
          ZAP the ZK-Ads Platform 🚀
        </Typography>
        <div style={{ marginLeft: "auto" }}>
          {Metamask.isLoggedIn() ? (
            <Button color="inherit">
              Connected with {memoizedWalletId || "Please connect MetaMask"}
            </Button>
          ) : (
            <Button color="inherit" onClick={Metamask.connect}>
              Login with Metamask
            </Button>
          )}
          {worldcoinAuthenticated ? (
            <Button color="inherit">Worldcoin Logged In</Button>
          ) : (
            <Button color="inherit" onClick={handleWorldcoinLogin}>
              Worldcoin Login
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
