import "../components/polyfills";
import React from "react";

import AdsList from "../components/AdsList";
import AdsUpload from "../components/AdsUpload";
import RobotAd from "../components/RobotAd";

const Dashboard = () => {
  return (
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
  );
};

export default Dashboard;
