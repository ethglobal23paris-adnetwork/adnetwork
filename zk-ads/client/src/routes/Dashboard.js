
import "../components/polyfills";
import React, { useState } from 'react';

import { Button, Grid } from '@mui/material';
import AdCardVote from '../components/AdCardVote';
import AdDialog from '../components/AdDialog';
import AdSnackbar from '../components/AdSnackbar';
import AdsList from '../components/AdsList';
import AdsUpload from "../components/AdsUpload";

import { Client } from '@xmtp/xmtp-js';
import { providers } from 'ethers';

const Dashboard = () => {
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(null);
    const [toastOpen, setToastOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleRatingChange = async (newValue) => {
      setRating(newValue);
      setToastOpen(true);
      const provider = new providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const xmtp = await Client.create(signer, { env: "dev" })
      console.log("Client created", xmtp);
      const conversation = await xmtp.conversations.newConversation(
        '0x67AD341F23913FC3c9041F1850dE466893531053'
      )
      
      const msg = {'from': await signer.getAddress(),
                  'ad_id': 'placeholder',
                  'rating': newValue};
      const message = await conversation.send(JSON.stringify(msg));
      console.log('sent', message);
    };

    const handleToastClose = () => {
        setToastOpen(false);
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <div style={{ padding: '2em' }}>
              <h2>Upload an ad on the Web3Provider and add to blockchain</h2>
              <AdsUpload />
          </div>

          <div style={{ padding: '2em' }}>
              <h2>List of all the ads, view count and zk rollups counter.</h2>
              <AdsList />
          </div>

          <div style={{ padding: '2em' }}>
              <h2>Example ad card, click refresh to see the counter increase and get a new ad.</h2>
              <AdCardVote onRatingChange={handleRatingChange} />
              <AdDialog open={open} onClose={handleClose}  />
              <AdSnackbar open={toastOpen} onClose={handleToastClose} />
              <Button variant="contained" onClick={() => setOpen(true)}>
                  Refresh
              </Button>
          </div>
      </div>
  );
};

export default Dashboard;
