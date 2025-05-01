// client/src/Pages/Welcome.js
import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


function Welcome() {
  const navigate = useNavigate();

  return (
    <>
      

      {/* hero section */}
      <Box
        sx={{
          minHeight: 'calc(100vh - 64px)',      // subtract AppBar height
          bgcolor: 'background.default',        // light grey from theme
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          px: 2,
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" gutterBottom color="text.primary" fontWeight={700}>
            Welcome to&nbsp;DataPilot
          </Typography>

          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}
          >
            Harness the power of data-driven insights for your e-commerce
            business. Discover powerful analytics and transform your store today.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              size="large"
              variant="contained"
              color="primary"
              onClick={() => navigate('/register')}
            >
              Get Started
            </Button>

            <Button
              size="large"
              variant="outlined"
              color="primary"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Welcome;
