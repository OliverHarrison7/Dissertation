// client/src/Pages/Welcome.js
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const navigate = useNavigate();

  return (
    <>
    

      {/* Main Hero Section */}
      <Box
        sx={{
          // The navbar is typically ~64px tall, so subtract it
          height: 'calc(100vh - 64px)',
          backgroundColor: '#f9fafb', // a light gray typical of dashboard backgrounds
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          px: 2,
        }}
      >
        <Typography 
          variant="h2" 
          sx={{ mb: 2, fontWeight: 'bold' }}
        >
          Welcome to DataPilot
        </Typography>

        <Typography 
          variant="h6" 
          sx={{ mb: 4, color: 'text.secondary', maxWidth: '600px' }}
        >
          Harness the power of data-driven insights for your e-commerce business. 
          Explore tailored solutions, discover powerful analytics, and transform your store today.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            sx={{ 
              backgroundColor: '#2C3E50',
              '&:hover': { backgroundColor: '#1f2d3b' },
            }}
            onClick={() => navigate('/register')}
          >
            Get Started
          </Button>
          <Button
            variant="outlined"
            sx={{
              color: '#2C3E50',
              borderColor: '#2C3E50',
              '&:hover': { borderColor: '#1f2d3b', color: '#1f2d3b' },
            }}
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default Welcome;
