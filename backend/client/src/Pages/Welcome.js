// client/src/Pages/Welcome.js
import React from 'react';
import { Box, Typography, Button, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import WelcomeNavBar from '../components/WelcomeNavBar';

const Welcome = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // "Get Started" goes to the Register page
    navigate('/register');
  };

  const handleLogin = () => {
    // "Login here" goes to the Login page
    navigate('/login');
  };

  return (
    <>
      <WelcomeNavBar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'calc(100vh - 64px)', 
          textAlign: 'center',
          backgroundImage: 'url(/welcome-bg.jpg)', 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          color: '#fff',
          p: 2,
        }}
      >
        {/* Dark overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
        />
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '600px',
          }}
        >
          <Typography variant="h2" sx={{ mb: 2 }}>
            Welcome to Our E-Commerce Experience
          </Typography>
          <Typography variant="h5" sx={{ mb: 4 }}>
            Explore our wide range of products and discover the best deals tailored just for you.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{ mb: 2, px: 4, py: 1 }}
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
    </>
  );
};

export default Welcome;
