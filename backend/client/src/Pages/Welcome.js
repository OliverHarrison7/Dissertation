import React from 'react';
import { Box, Typography, Button, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/register');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <Box
      sx={{
        backgroundImage: 'url(/welcome-bg.jpg)', // Place your image "welcome-bg.jpg" in public folder
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        position: 'relative',
      }}
    >
      {/* Dark overlay for readability */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      />
      
      {/* Content container */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#fff',
          textAlign: 'center',
          px: 2,
        }}
      >
        <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
          Welcome to My E-Commerce Site
        </Typography>
        <Typography variant="h5" sx={{ mb: 4, maxWidth: 600 }}>
          Discover our amazing range of products and enjoy a seamless shopping experience.
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{ backgroundColor: '#1976d2', px: 4, py: 1, mb: 2 }}
          onClick={handleGetStarted}
        >
          Get Started
        </Button>
        <Typography variant="body1">
          Already have an account?{' '}
          <Link
            component="button"
            variant="body1"
            onClick={handleLogin}
            sx={{ color: '#fff', textDecoration: 'underline' }}
          >
            Login here
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Welcome;
