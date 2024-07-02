// pages/index.tsx
import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import Link from 'next/link';


const Home: React.FC = () => {
  return (
    <Box>
      
      <Container maxWidth="sm">
        <Box sx={{ my: 4, textAlign: 'center', color:'black' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to My Next.js App
          </Typography>
         
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
