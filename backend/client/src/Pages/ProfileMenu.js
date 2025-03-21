import React, { useState } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  ListItemIcon,
  Typography
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

const ProfileMenu = ({ onLogout, onAccount }) => {
  // Anchor for the MUI Menu
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAccountClick = () => {
    handleMenuClose();
    if (onAccount) onAccount(); // e.g. navigate to account page
  };

  const handleLogoutClick = () => {
    handleMenuClose();
    if (onLogout) onLogout(); // e.g. clear token, navigate to /login
  };

  return (
    <>
      <IconButton
        onClick={handleMenuOpen}
        color="inherit"
        sx={{ ml: 2 }}
      >
        {/* Could use an <Avatar> or <AccountCircleIcon> */}
        <Avatar sx={{ bgcolor: 'primary.main' }}>
          {/* Optionally place user’s initials or an icon */}
          <AccountCircleIcon />
        </Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleAccountClick}>
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">My Account</Typography>
        </MenuItem>
        <MenuItem onClick={handleLogoutClick}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Logout</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileMenu;
