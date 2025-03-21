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

  // State for anchoring the profile menu
  const [anchorEl, setAnchorEl] = useState(null);

  // Example search handling
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      console.log('Search value:', e.target.value);
      // Potentially navigate to a search results page:
      // navigate(`/search?query=${encodeURIComponent(e.target.value)}`);
    }
  };

  // Handlers for the profile menu
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMyAccount = () => {
    handleProfileMenuClose();
    // e.g. navigate to /account
    navigate('/my-account');
  };

  const handleLogout = () => {
    handleProfileMenuClose();
    // e.g. clear auth tokens, navigate to /login
    console.log('Logging out...');
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

        {/* Right-side Profile Avatar */}
        <Box>
          <IconButton
            onClick={handleProfileMenuOpen}
            color="inherit"
            sx={{ ml: 1 }}
          >
            {/* Could use a real user avatar or an icon. 
                We'll do a generic Avatar with an icon inside. */}
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <AccountCircleIcon />
            </Avatar>
          </IconButton>
          
          {/* Profile Menu */}
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
