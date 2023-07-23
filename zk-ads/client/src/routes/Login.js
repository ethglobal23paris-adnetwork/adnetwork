import React, { useState, useEffect } from 'react';
import { Button, Paper, Typography, Avatar, Box, AppBar, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import avatar from '../assets/MetaMask.png'
import worldcoin from '../assets/worldcoin.png'
import Ethereum from '../helpers/Ethereum';
import { useAuth0 } from '@auth0/auth0-react';
import { SpaRounded } from '@mui/icons-material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Login = () => {
    const [state, setState] = useState([]);
    let navigate = useNavigate();
    const {
        isAuthenticated,
        loginWithRedirect,
    } = useAuth0();

    useEffect(() => {
        if (Ethereum.accounts.length > 0 && isAuthenticated) 
            navigate('/dashboard')
    }, [isAuthenticated])

    async function authenticateMetamask() {
            await Ethereum.connect();
            if (Ethereum.accounts > 0 && isAuthenticated) 
                navigate('/dashboard')
    }

    async function authenticateWorldcoin() {
        
        if (isAuthenticated && Ethereum.accounts > 0) {
            navigate('/dashboard')
        }
    }

    const WorldcoinLoginButton = () => {
        return (
            <Button variant="contained" style={{
                color: '#0099ff', marginBottom: '10%',
                marginRight: '15%',
                marginLeft: '15%', marginTop: '5%',
            }} onClick={async () => {
                await loginWithRedirect();
                if(isAuthenticated) {  
                await authenticateWorldcoin(); 
                }}}>
                {isAuthenticated && <CheckCircleIcon color="success" style={{ marginRight: 10 }}/>}
                <Avatar alt="Worldcoin" src={worldcoin} style={{ marginRight: 10 }} />
                <Typography style={{ color: '#ffffff' }}>Login with Worldcoin</Typography>
            </Button>
        );
    }

    const MetamaskLoginButton = () => {
        return (
            <Button variant="contained" style={{
                color: '#0099ff', marginBottom: '5%',
                marginRight: '15%',
                marginLeft: '15%', marginTop: '10%',
            }} onClick={async () => { 
                await authenticateMetamask() 
            }}>
                {Ethereum.accounts.length > 0 && <CheckCircleIcon color="success" style={{ marginRight: 10 }}/>}
                <Avatar alt="Metamask" src={avatar} style={{ marginRight: 10 }} />
                <Typography style={{ color: '#ffffff' }}>Login with Metamask</Typography>
            </Button>
        );
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
                <MetamaskLoginButton />
                <WorldcoinLoginButton />
            </Paper>
        </div>
    );
}
export default Login;
