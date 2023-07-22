import React, { useState, useEffect } from 'react';
import { Button, Paper, Typography, Avatar, Box, AppBar, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Ethereum from '../helpers/Ethereum';

const Dashboard = () => {
    let navigate = useNavigate();

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" style={{ backgroundColor: '#0099ff' }}>
                    <Toolbar variant="dense">

                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
}
export default Dashboard;
