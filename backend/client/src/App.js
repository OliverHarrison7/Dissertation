import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Sidebar from './components/Sidebar';

import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import Orders from './Pages/Orders';
import Products from './Pages/Products';

import './App.css';

// Public layout for auth pages (login/register)
const PublicLayout = ({ children }) => (
  <>
    {/* NavBar is visible on public pages too */}
    <NavBar />
    <div className="public-container">
      {children}
    </div>
  </>
);

// Protected layout for the rest of the app (dashboard, orders, products)
const ProtectedLayout = ({ children }) => (
  <>
    {/* NavBar is also visible on protected pages */}
    <NavBar />
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        {children}
      </div>
    </div>
  </>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes (no sidebar, but NavBar included) */}
        <Route
          path="/login"
          element={
            <PublicLayout>
              <Login />
            </PublicLayout>
          }
        />
        <Route
          path="/register"
          element={
            <PublicLayout>
              <Register />
            </PublicLayout>
          }
        />

        {/* Protected routes (sidebar + NavBar) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedLayout>
              <Dashboard />
            </ProtectedLayout>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedLayout>
              <Orders />
            </ProtectedLayout>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedLayout>
              <Products />
            </ProtectedLayout>
          }
        />

        {/* Default route (public) */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <Login />
            </PublicLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
