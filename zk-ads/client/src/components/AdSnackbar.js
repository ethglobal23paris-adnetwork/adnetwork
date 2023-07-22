import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const AdSnackbar = ({ open, onClose }) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert onClose={onClose} severity="success" sx={{ width: '100%' }}>
        Thanks for your rating!
      </Alert>
    </Snackbar>
  );
};

export default AdSnackbar;
