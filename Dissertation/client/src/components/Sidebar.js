import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaChartLine,
  FaBullhorn,
  FaTags,
  FaCog
} from 'react-icons/fa';

import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon
} from '@mui/material';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();

  // For MUI Menu anchor
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  // Example: On "My Account" click, navigate to some /my-account route
  const handleMyAccount = () => {
    handleProfileMenuClose();
    navigate('/myaccount');
  };

  // Example: On "Logout" click, you might clear tokens, then navigate
  const handleLogout = () => {
    handleProfileMenuClose();
    console.log('Logging out...');
    // e.g. remove token from localStorage
    // localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        {/* Title */}
        <h2 className="sidebar-logo">DataPilot</h2>

        {/* Profile Icon */}
        <IconButton onClick={handleProfileMenuOpen} className="profile-button">
          <Avatar>
            {/* You can place a user initial or keep the icon */}
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
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink 
              to="/home" 
              className={({ isActive }) => (isActive ? 'active-link' : undefined)}
            >
              <FaTachometerAlt className="icon" />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/orders" className={({ isActive }) => (isActive ? 'active-link' : undefined)}>
              <FaShoppingCart className="icon" />
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" className={({ isActive }) => (isActive ? 'active-link' : undefined)}>
              <FaBoxOpen className="icon" />
              Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/customers" className={({ isActive }) => (isActive ? 'active-link' : undefined)}>
              <FaUsers className="icon" />
              Customers
            </NavLink>
          </li>
          <li>
            <NavLink to="/analytics" className={({ isActive }) => (isActive ? 'active-link' : undefined)}>
              <FaChartLine className="icon" />
              Analytics
            </NavLink>
          </li>
          <li>
            <NavLink to="/marketing" className={({ isActive }) => (isActive ? 'active-link' : undefined)}>
              <FaBullhorn className="icon" />
              Marketing
            </NavLink>
          </li>
          <li>
            <NavLink to="/discounts" className={({ isActive }) => (isActive ? 'active-link' : undefined)}>
              <FaTags className="icon" />
              Discounts
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" className={({ isActive }) => (isActive ? 'active-link' : undefined)}>
              <FaCog className="icon" />
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
