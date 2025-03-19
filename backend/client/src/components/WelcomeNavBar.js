// client/src/components/WelcomeNavBar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function WelcomeNavBar() {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ backgroundColor: '#2C3E50' }}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          MyCompany
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button sx={{ color: '#fff' }} onClick={() => navigate('/about')}>
            About
          </Button>
          <Button sx={{ color: '#fff' }} onClick={() => navigate('/services')}>
            Services
          </Button>
          <Button sx={{ color: '#fff' }} onClick={() => navigate('/pricing')}>
            Pricing
          </Button>
          <Button sx={{ color: '#fff' }} onClick={() => navigate('/contact')}>
            Contact
          </Button>
          <Button sx={{ color: '#fff' }} onClick={() => navigate('/login')}>
            Login
          </Button>
          <Button variant="contained" onClick={() => navigate('/register')}>
            Register
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default WelcomeNavBar;
