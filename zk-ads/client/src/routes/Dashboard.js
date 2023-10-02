import "../components/polyfills";
import React, { useEffect } from "react";
import { Typography, Grid, Divider, Card, CardContent } from "@mui/material";
import AdsList from "../components/AdsList";
import AdsUpload from "../components/AdsUpload";
import RobotAd from "../components/RobotAd";
import { useNavigate } from "react-router-dom";
import Ethereum from "../helpers/Ethereum";

const Dashboard = () => {
  let navigate = useNavigate();

  useEffect(() => {
    Ethereum.connect();
  }, [navigate]);

  return (
    <div>
      <Grid container spacing={4} style={{ padding: "2em" }}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h4">All ads on the blockchain</Typography>
              <Typography variant="body1">
                This is a list of all ads on the blockchain. You can click on
                the ad to view the details.
              </Typography>
              <AdsList />
            </CardContent>
          </Card>
        </Grid>

        <Divider variant="middle" style={{ margin: "2em 0" }} />

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h4">Example ad display</Typography>
              <Typography variant="body1">
                This is an example of how the ad will look like on the user of
                ZKADS SDK.
              </Typography>
              <RobotAd />
            </CardContent>
          </Card>
        </Grid>

        <Divider variant="middle" style={{ margin: "2em 0" }} />

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h4">Upload your ad</Typography>
              <Typography variant="body1">
                Upload your ad to the blockchain. You will need to pay a fee of
                0.01 ETH. When you upload your ad, it will be displayed on the
                SDK.
              </Typography>
              <AdsUpload />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
