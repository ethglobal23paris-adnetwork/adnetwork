import React, { useEffect, useState } from "react";
import {
  Button,
  Paper,
  Typography,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import avatar from "../assets/MetaMask.png";
import worldcoin from "../assets/worldcoin.png";
import Ethereum from "../helpers/Ethereum";
import { useAuth0 } from "@auth0/auth0-react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Login = () => {
  let navigate = useNavigate();
  let [metamask, setMetamask] = useState(false);
  const { isAuthenticated: worldcoinAuthenticated, loginWithRedirect: worldcoinLogin } = useAuth0();

  useEffect(() => {
    async function connect() {
      await Ethereum.connect();
    }
    connect(); // todo fixme

    if (Ethereum.accounts.length > 0 && worldcoinAuthenticated) navigate("/dashboard");
  }, [worldcoinAuthenticated, navigate]);

  async function authenticateMetamask() {
    await Ethereum.connect();
    if (Ethereum.accounts.length > 0) {
      setMetamask(true);
    }
    if (Ethereum.accounts.length > 0 && worldcoinAuthenticated) navigate("/dashboard");
  }

  async function authenticateWorldcoin() {
    if (worldcoinAuthenticated && Ethereum.accounts.length > 0) {
      navigate("/dashboard");
    }
  }

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
          if (worldcoinAuthenticated) {
            await authenticateWorldcoin();
          }
        }}
      >
        {worldcoinAuthenticated && (
          <CheckCircleIcon color="success" style={{ marginRight: 10 }} />
        )}
        <Avatar alt="Worldcoin" src={worldcoin} style={{ marginRight: 10 }} />
        <Typography style={{ color: "#ffffff" }}>
          Login with Worldcoin
        </Typography>
      </Button>
    );
  };

  const MetamaskLoginButton = () => {
    return (
      <Button
        variant="contained"
        style={{
          color: "#0099ff",
          marginBottom: "5%",
          marginRight: "15%",
          marginLeft: "15%",
          marginTop: "10%",
        }}
        onClick={async () => {
          await authenticateMetamask();
        }}
      >
        {metamask && (
          <CheckCircleIcon color="success" style={{ marginRight: 10 }} />
        )}
        <Avatar alt="Metamask" src={avatar} style={{ marginRight: 10 }} />
        <Typography style={{ color: "#ffffff" }}>
          Login with Metamask
        </Typography>
      </Button>
    );
  };

  return (
    <div>
      <Paper
        elevation={24}
        style={{
          marginTop: "13%",
          marginRight: "35%",
          marginLeft: "35%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <MetamaskLoginButton />
        <WorldcoinLoginButton />
        <Typography variant="subtitle1" color="gray">
          Please login to continue
        </Typography>
      </Paper>
    </div>
  );
};
export default Login;
