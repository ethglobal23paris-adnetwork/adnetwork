import "../components/polyfills";
import React from "react";
import { Typography, Box, AppBar, Toolbar, Grid, Divider } from "@mui/material";
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

      <Grid container spacing={4} style={{ padding: "2em" }}>
        <Grid item xs={12}>
          <Typography variant="h4">Upload an ad on the Web3Provider and add to blockchain</Typography>
          <AdsUpload />
        </Grid>
        
        <Divider variant="middle" style={{ margin: "2em 0" }} />

        <Grid item xs={12}>
          <Typography variant="h4">Ads</Typography>
          <AdsList />
        </Grid>

        <Divider variant="middle" style={{ margin: "2em 0" }} />

        <Grid item xs={12}>
          <Typography variant="h4">🤖 AI to serve relevant ads to users!</Typography>
          <RobotAd />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
