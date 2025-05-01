// client/src/components/WelcomeNavBar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const navLinks = ['about', 'services', 'pricing', 'contact', 'login'];

function WelcomeNavBar() {
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="primary" elevation={3}>
      <Toolbar sx={{ px: { xs: 2, sm: 4 } }}>
        <Typography
          variant="h6"
          onClick={() => navigate('/')}
          sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: '.1rem', cursor: 'pointer' }}
        >
          DataPilot
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          {navLinks.map((path) => (
            <Button
              key={path}
              color="inherit"
              sx={{ textTransform: 'none', fontSize: '1rem' }}
              onClick={() => navigate(`/${path}`)}
            >
              {path.charAt(0).toUpperCase() + path.slice(1)}
            </Button>
          ))}

          {/* CTA – uses secondary colour */}
          <Button
            variant="contained"
            color="secondary"
            sx={{ textTransform: 'none', fontSize: '1rem' }}
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
