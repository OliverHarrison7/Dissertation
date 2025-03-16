// Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaBoxOpen, FaShoppingCart, FaUsers, FaChartLine, FaBullhorn, FaTags, FaCog } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-logo">DataPilot</h2>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => isActive ? 'active-link' : undefined}
            >
              <FaTachometerAlt className="icon" />
              Overview Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/orders" className={({ isActive }) => isActive ? 'active-link' : undefined}>
              <FaShoppingCart className="icon" />
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" className={({ isActive }) => isActive ? 'active-link' : undefined}>
              <FaBoxOpen className="icon" />
              Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/customers" className={({ isActive }) => isActive ? 'active-link' : undefined}>
              <FaUsers className="icon" />
              Customers
            </NavLink>
          </li>
          <li>
            <NavLink to="/analytics" className={({ isActive }) => isActive ? 'active-link' : undefined}>
              <FaChartLine className="icon" />
              Analytics
            </NavLink>
          </li>
          <li>
            <NavLink to="/marketing" className={({ isActive }) => isActive ? 'active-link' : undefined}>
              <FaBullhorn className="icon" />
              Marketing
            </NavLink>
          </li>
          <li>
            <NavLink to="/discounts" className={({ isActive }) => isActive ? 'active-link' : undefined}>
              <FaTags className="icon" />
              Discounts
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" className={({ isActive }) => isActive ? 'active-link' : undefined}>
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
