// client/src/components/NavBar.js
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

  /* ---------- state for profile menu ---------- */
  const [anchorEl, setAnchorEl] = useState(null);

  /* ---------- search handling (press Enter) ---------- */
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      console.log('Search value:', e.target.value);
      // Example:
      // navigate(`/search?query=${encodeURIComponent(e.target.value)}`);
    }
  };

  /* ---------- profile-menu handlers ---------- */
  const handleProfileMenuOpen  = (event) => setAnchorEl(event.currentTarget);
  const handleProfileMenuClose = ()     => setAnchorEl(null);

  const handleMyAccount = () => {
    handleProfileMenuClose();
    // IMPORTANT: keep the dash — all routes use /my-account
    navigate('/my-account');
  };

  const handleLogout = () => {
    handleProfileMenuClose();
    console.log('Logging out…');
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

        {/* centred search bar */}
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', mx: 2 }}>
          <TextField
            size="small"
            placeholder="Search…"
            variant="outlined"
            onKeyDown={handleSearch}
            sx={{ width: 400, bgcolor: '#fff', borderRadius: 1 }}
          />
        </Box>

        {/* profile avatar */}
        <IconButton onClick={handleProfileMenuOpen} color="inherit" sx={{ ml: 1 }}>
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            <AccountCircleIcon />
          </Avatar>
        </IconButton>

        {/* dropdown menu */}
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
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
