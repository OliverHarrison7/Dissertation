import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import Orders from './Pages/Orders';
import Products from './Pages/Products';
import Sidebar from './components/Sidebar';
import './App.css';

// Public layout for auth pages
const PublicLayout = ({ children }) => (
  <div className="public-container">
    {children}
  </div>
);

// Protected layout for the rest of the app
const ProtectedLayout = ({ children }) => (
  <div className="dashboard-container">
    <Sidebar />
    <div className="main-content">
      {children}
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes: Login and Register do not include Sidebar */}
        <Route path="/login" element={
          <PublicLayout>
            <Login />
          </PublicLayout>
        } />
        <Route path="/register" element={
          <PublicLayout>
            <Register />
          </PublicLayout>
        } />
        
        {/* Protected routes: show Sidebar and main content */}
        <Route path="/dashboard" element={
          <ProtectedLayout>
            <Dashboard />
          </ProtectedLayout>
        } />
        <Route path="/orders" element={
          <ProtectedLayout>
            <Orders />
          </ProtectedLayout>
        } />
        <Route path="/products" element={
          <ProtectedLayout>
            <Products />
          </ProtectedLayout>
        } />
        {/* Default route (you might redirect to login if not authenticated) */}
        <Route path="/" element={
          <PublicLayout>
            <Login />
          </PublicLayout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
