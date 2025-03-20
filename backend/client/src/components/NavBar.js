import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

function NavBar() {
  const navigate = useNavigate();
  // For anchoring the profile menu
  const [anchorEl, setAnchorEl] = useState(null);

  // Example search handling
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      console.log('Search value:', e.target.value);
      // Possibly navigate to a search results page:
      // navigate(`/search?query=${encodeURIComponent(e.target.value)}`);
    }
  };

  // Handlers for the profile icon menu
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMyAccount = () => {
    handleProfileMenuClose();
    // e.g. navigate to /my-account
    navigate('/my-account');
  };

  const handleLogout = () => {
    handleProfileMenuClose();
    // e.g. remove auth tokens, then navigate to /login
    console.log('Logout clicked');
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#2C3E50' }}>
      <Toolbar>
        {/* Brand / Logo */}
        <Typography
          variant="h6"
          sx={{ cursor: 'pointer' }}
          onClick={() => navigate('/')}
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

        {/* Profile Avatar / Menu */}
        <Box>
          <IconButton onClick={handleProfileMenuOpen} color="inherit">
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <AccountCircleIcon />
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={handleMyAccount}>
              <ListItemIcon>
                <AccountCircleIcon fontSize="small" />
              </ListItemIcon>
              My Account
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
