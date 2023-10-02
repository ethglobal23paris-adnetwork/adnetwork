import React, { createContext, useContext, useEffect, useState } from 'react';
import Ethereum from './Ethereum';
import { useAuth0 } from "@auth0/auth0-react";
import {
  Button,
  Paper,
  Typography,
  Avatar,
  Box,
  AppBar,
  Toolbar,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { useNavigate } from "react-router-dom";
import avatar from "../assets/MetaMask.png";
import worldcoin from "../assets/worldcoin.png";

const WorldcoinAuthContext = createContext();


export function WorldcoinAuthProvider({ children }) {
  const [worldcoinLoggedIn, setWorldcoinLoggedIn] = useState(false);
  const { isAuthenticated: worlcoinAuthenticated, loginWithRedirect: worldcoinLogin } = useAuth0();


  const WorldcoinLoginButton = () => {
    return (
      <Button
        variant="contained"
        style={{
          color: "#0099ff",
          marginBottom: "10%",
          marginRight: "15%",
          marginLeft: "15%",
          marginTop: "5%",
        }}
        onClick={async () => {
          await worldcoinLogin();
        }}
      >
        {worlcoinAuthenticated && (
          <CheckCircleIcon color="success" style={{ marginRight: 10 }} />
        )}
        <Avatar alt="Worldcoin" src={worldcoin} style={{ marginRight: 10 }} />
        <Typography style={{ color: "#ffffff" }}>
          Login with Worldcoin
        </Typography>
      </Button>
    );
  };
  useEffect(() => {
    // Implement your logic to check Worldcoin login status
    // For this example, I'm just setting worldcoinLoggedIn to true if Ethereum is connected
    // Replace this with your actual logic
    // Example: const isWorldcoinLoggedIn = await checkWorldcoinLogin();
    // setWorldcoinLoggedIn(isWorldcoinLoggedIn);
    if (Ethereum.isConnected()) {
      setWorldcoinLoggedIn(true);
    }
  }, []);

  return (
    <WorldcoinAuthContext.Provider value={{ worldcoinLoggedIn }}>
      {children}
    </WorldcoinAuthContext.Provider>
  );
}

export function useWorldcoinAuth() {
  return useContext(WorldcoinAuthContext);
}
