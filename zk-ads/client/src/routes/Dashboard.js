import React, { useState } from 'react';
import { Button, Typography, Box, Alert, AppBar, Toolbar, Card, CardMedia, CardContent, CardActions, Grid, Chip, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Ethereum from '../helpers/Ethereum';
import { Info as InfoIcon, FlashOn, ThumbUp, ThumbDown } from '@mui/icons-material';

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
            <AppBar position="static" style={{ backgroundColor: '#0099ff' }}>
                <Toolbar variant="dense">
                    <Typography variant="h6" color="inherit" component="div">
                        Zap Ad Platform
                    </Typography>
                </Toolbar>
            </AppBar>

            <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                style={{ padding: '2em' }}  
            >
                <Grid item xs={12} md={6} lg={4}>
                    <Card sx={{ position: 'relative', margin: '1em' }}> 
                        <CardMedia
                            component="img"
                            alt="Ad image"
                            height="200"
                            image="https://pbs.twimg.com/media/FyalsUSaEAAQ-RU.jpg"
                        />
                        <Box>
                            <Button onClick={() => handleRatingChange("up")}>
                                <ThumbUp  style={{ color: 'green' }} />
                            </Button>
                            <Button onClick={() => handleRatingChange("down")}>
                                <ThumbDown  style={{ color: 'red' }} />
                            </Button>
                        </Box>
                        <Chip
                            icon={<FlashOn />}
                            label="Powered by ZAP"
                            size="small"
                            color="secondary"
                            sx={{ position: 'absolute', bottom: 5, right: 5 }}
                        />
                        <Chip
                            icon={<InfoIcon />}
                            size="small"
                            color="primary"
                            clickable
                            onClick={handleClickOpen}
                            sx={{ position: 'absolute', top: 5, right: 5 }}
                        />
                    </Card>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                    >
                        <DialogTitle>Ad Info</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                <strong>Title:</strong> Ad Title
                                <br />
                                <strong>Content:</strong> Ad content
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Snackbar open={toastOpen} autoHideDuration={6000} onClose={handleToastClose}>
                        <Alert onClose={handleToastClose} severity="success" sx={{ width: '100%' }}>
                            Thanks for your rating!
                        </Alert>
                    </Snackbar>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Dashboard;
