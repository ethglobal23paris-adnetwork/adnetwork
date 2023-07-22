
import "../components/polyfills";
import React from 'react';

import AdsList from '../components/AdsList';
import AdsUpload from "../components/AdsUpload";


const Dashboard = () => {
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <div style={{ padding: '2em' }}>
              <h2>Upload an ad on the Web3Provider and add to blockchain</h2>
              <AdsUpload />
          </div>

          <div style={{ padding: '2em' }}>
              <h2>List of all the ads, view count and zk rollups counter.</h2>
              <h4>Thumb up or down and the counter change.</h4>
              <AdsList />
          </div>

      </div>
  );
};

export default Dashboard;
