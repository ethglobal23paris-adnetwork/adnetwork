import "../components/polyfills";
import React from "react";
import { Typography, Box, AppBar, Toolbar } from "@mui/material";
import AdsList from "../components/AdsList";
import AdsUpload from "../components/AdsUpload";
import RobotAd from "../components/RobotAd";

const Dashboard = () => {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="inherit">
          <Toolbar>
            <Typography variant="h2" component="h1">
              ZAP
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <div style={{ padding: "2em" }}>
          <h2>Upload an ad on the Web3Provider and add to blockchain</h2>
          <AdsUpload />
        </div>

        <div style={{ padding: "2em" }}>
          <h2>Ads</h2>
          <AdsList />
        </div>

        <div style={{ padding: "2em" }}>
          <h2>🤖 AI to serve relevant ads to users!</h2>
          <RobotAd />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
