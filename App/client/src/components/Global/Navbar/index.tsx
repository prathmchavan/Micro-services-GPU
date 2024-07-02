"use client"
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Box from '@mui/material/Box';
import { Router, useRouter } from 'next/router';


const Navbar: React.FC = () => {

    // const router = useRouter();
    return (
        <AppBar position="static" sx={{ backgroundColor: 'black' }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link href="/" passHref>
                        <Button sx={{ color: 'white' }} >Home</Button>
                    </Link>
                </Typography>
                <Box>
                    <Link href={'/signup'} >
                        <Button sx={{ color: 'white' }}>Sign Up</Button>
                    </Link>
                    <Link href="/signin" passHref>
                        <Button sx={{ color: 'white' }}>Sign In</Button>
                    </Link>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
