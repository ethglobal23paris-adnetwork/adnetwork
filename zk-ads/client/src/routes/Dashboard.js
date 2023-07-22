
import "../components/polyfills";
import React, { useState } from 'react';

import { Grid, Box, AppBar, Toolbar } from '@mui/material';
import AdCard from '../components/AdCard';
import AdDialog from '../components/AdDialog';
import AdSnackbar from '../components/AdSnackbar';

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
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static" color='inherit'>
        <Toolbar variant="dense">

            {/* <img alt="Zymbit Logo" style={{ height: 50 }} src={require("")} /> */}
        </Toolbar>

    </AppBar>
    <Grid
      container
      direction="column"
      style={{ minHeight: '100vh' }}
    >
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
    </Box>
  );
};

export default Dashboard;
