import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

const AdDialog = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Ad Info</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <strong>Title:</strong> Ad Title
          <br />
          <strong>Content:</strong> Ad content
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdDialog;
