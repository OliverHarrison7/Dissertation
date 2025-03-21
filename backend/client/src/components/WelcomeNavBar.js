// client/src/components/WelcomeNavBar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function WelcomeNavBar() {
  const navigate = useNavigate();

  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: '#2C3E50', 
        boxShadow: 3,
        px: { xs: 2, sm: 4 } 
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: 'bold',
            letterSpacing: '.1rem',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/')}
        >
          DataPilot
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            color="inherit" 
            sx={{ textTransform: 'none', fontSize: '1rem' }} 
            onClick={() => navigate('/about')}
          >
            About
          </Button>
          <Button 
            color="inherit" 
            sx={{ textTransform: 'none', fontSize: '1rem' }} 
            onClick={() => navigate('/services')}
          >
            Services
          </Button>
          <Button 
            color="inherit" 
            sx={{ textTransform: 'none', fontSize: '1rem' }} 
            onClick={() => navigate('/pricing')}
          >
            Pricing
          </Button>
          <Button 
            color="inherit" 
            sx={{ textTransform: 'none', fontSize: '1rem' }} 
            onClick={() => navigate('/contact')}
          >
            Contact
          </Button>
          <Button 
            color="inherit" 
            sx={{ textTransform: 'none', fontSize: '1rem' }} 
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
          <Button 
            variant="contained" 
            sx={{
              textTransform: 'none',
              fontSize: '1rem',
              backgroundColor: '#f57c00',
              '&:hover': { backgroundColor: '#e65100' },
            }}
            onClick={() => navigate('/register')}
          >
            Register
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default WelcomeNavBar;
