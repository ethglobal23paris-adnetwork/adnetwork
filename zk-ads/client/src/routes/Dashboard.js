
import "../components/polyfills";
import React, { useState } from 'react';

import { Grid } from '@mui/material';
import AdCard from '../components/AdCard';
import AdDialog from '../components/AdDialog';
import AdSnackbar from '../components/AdSnackbar';

import { Client } from '@xmtp/xmtp-js';
import { Wallet } from 'ethers';

const wallet = Wallet.createRandom()

const xmtp = await Client.create(wallet, { env: "dev" })
console.log("Client created", xmtp);


const conversation = await xmtp.conversations.newConversation(
  '0x67AD341F23913FC3c9041F1850dE466893531053'
)


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
      const msg = `I rate this ad ${newValue}`;
      const message = await conversation.send(msg);
      console.log('sent message:', message);
    };

    const handleToastClose = () => {
        setToastOpen(false);
    };


  return (
    <Grid
      container
      direction="column"
      style={{ minHeight: '100vh' }}
    >
      {/* ... AppBar code as before ... */}
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        style={{ padding: '2em' }}
      >
        <Grid item xs={12} md={6} lg={4}>
          <AdCard onRatingChange={handleRatingChange} />
          <AdDialog open={open} onClose={handleClose}  />
          <AdSnackbar open={toastOpen} onClose={handleToastClose} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
