import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

import { Grid } from '@mui/material';
import AdCard from '../components/AdCard';
import AdDialog from '../components/AdDialog';
import AdSnackbar from '../components/AdSnackbar';

const Dashboard = () => {
    let navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(null);
    const [toastOpen, setToastOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleRatingChange = (newValue) => {
        setRating(newValue);
        setToastOpen(true);
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
          <AdDialog open={open} onClose={handleClose} />
          <AdSnackbar open={toastOpen} onClose={handleToastClose} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
