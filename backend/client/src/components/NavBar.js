import React from 'react';
import { AppBar, Toolbar, Typography, Button, TextField, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      // For demonstration, just log the value or handle the search
      console.log('Search value:', e.target.value);
      // Potentially navigate to a search results page
      // navigate(`/search?query=${encodeURIComponent(e.target.value)}`);
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#2C3E50' }}>
      <Toolbar>
        {/* Brand / Logo */}
        <Typography
          variant="h6"
          sx={{ cursor: 'pointer' }}
          onClick={() => navigate('/')}  // Go to home on logo click
        >
          MyBrand
        </Typography>

        {/* Centered Search Bar */}
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', ml: 2, mr: 2 }}>
          <TextField
            size="small"
            placeholder="Search..."
            variant="outlined"
            onKeyDown={handleSearch}
            sx={{
              width: '400px',
              backgroundColor: '#fff',
              borderRadius: 1,
              
            }}
          />
        </Box>

        {/* Right-side Buttons */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button color="inherit" onClick={() => navigate('/login')}>
            Login
          </Button>
          <Button color="inherit" onClick={() => navigate('/register')}>
            Register
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
