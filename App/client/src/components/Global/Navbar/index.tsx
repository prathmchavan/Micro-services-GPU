"use client"
import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Box from '@mui/material/Box';
import { useRouter } from 'next/navigation';
import getUser from '@/hooks/get-user';

const Navbar: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkUserStatus = async () => {
            const userLoggedIn = await getUser(); // Assuming getUser returns boolean

            if (userLoggedIn) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        };

        checkUserStatus();
    }, []);

    const handleSignOut = async () => {
        try {
            // Perform sign-out logic, e.g., clear session, remove token, etc.
            // Example:
            // await fetch('/api/logout'); // Endpoint to clear session
            setIsLoggedIn(false);
            router.push('/'); // Redirect to home page after sign-out
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: 'black' }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link href="/" passHref>
                        <Button sx={{ color: 'white' }}>Home</Button>
                    </Link>
                </Typography>
                <Box>
                    {!isLoggedIn && (
                        <>
                            <Link href="/signup" passHref>
                                <Button sx={{ color: 'white' }}>Sign Up</Button>
                            </Link>
                            <Link href="/signin" passHref>
                                <Button sx={{ color: 'white' }}>Sign In</Button>
                            </Link>
                        </>
                    )}
                    {isLoggedIn && (
                        <Button sx={{ color: 'white' }} onClick={handleSignOut}>
                            Sign Out
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
