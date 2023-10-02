import "../components/polyfills";
import React, { useEffect } from "react";
import { Typography, Grid, Divider } from "@mui/material";
import AdsList from "../components/AdsList";
import AdsUpload from "../components/AdsUpload";
import RobotAd from "../components/RobotAd";
import { useNavigate } from "react-router-dom";
import Ethereum from "../helpers/Ethereum";

const Dashboard = () => {
let navigate = useNavigate();

  useEffect(()=>{
    Ethereum.connect()
  }, [navigate])

  return (
    <div>
      <Grid container spacing={4} style={{ padding: "2em" }}>
        <Grid item xs={12}>
          <Typography variant="h4">
            Upload an ad on the Web3Provider and add to blockchain
          </Typography>
          <AdsUpload />
        </Grid>

        <Divider variant="middle" style={{ margin: "2em 0" }} />

        <Grid item xs={12}>
          <Typography variant="h4">Ads</Typography>
          <AdsList />
        </Grid>

        <Divider variant="middle" style={{ margin: "2em 0" }} />

        <Grid item xs={12}>
          <Typography variant="h4">
            🤖 AI to serve relevant ads to users!
          </Typography>
          <RobotAd />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
