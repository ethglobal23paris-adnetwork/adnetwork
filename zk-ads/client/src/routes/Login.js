import React, { useState, useEffect } from 'react';
import { Button, Paper, Typography, Avatar, Box, AppBar, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import avatar from '../assets/MetaMask.png'
import Ethereum from '../helpers/Ethereum';
import { SpaRounded } from '@mui/icons-material';

const Login = () => {
    const [state, setState] = useState([]);
    let navigate = useNavigate();

    async function authenticate() {
        if (localStorage.getItem('connected') === 'true' && !(Ethereum.signer && Ethereum.provider && Ethereum.accounts.length > 0)) {
            await Ethereum.connect();
            if (Ethereum.accounts.length > 0) navigate('/dashboard')
        }
    }



    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" color='inherit'>
                    <Toolbar variant="dense">

                        {/* <img alt="Zymbit Logo" style={{ height: 50 }} src={require("")} /> */}
                    </Toolbar>

                </AppBar>
            </Box>
            <Paper elevation={24} style={{
                marginTop: '13%',
                marginRight: '35%',
                marginLeft: '35%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>

                <Button variant="contained" style={{
                    color: '#0099ff', marginBottom: '10%',
                    marginRight: '15%',
                    marginLeft: '15%', marginTop: '10%',
                }} onClick={async () => await authenticate()}>
                    <Avatar alt="Metamask" src={avatar} style={{ marginRight: 10 }} />
                    <Typography style={{ color: '#ffffff' }}>Login with Metamask</Typography>
                </Button>
            </Paper>
        </div>
    );
}
export default Login;
