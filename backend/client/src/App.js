// client/src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WelcomeNavBar from './components/WelcomeNavBar';
import Sidebar from './components/Sidebar';

import Welcome from './Pages/Welcome';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import Orders from './Pages/Orders';
import Products from './Pages/Products';
import Customers from './Pages/Customers';
import AddProduct from './Pages/AddProduct';
import EditProduct from './Pages/EditProduct';
import About from './Pages/About';
import Services from './Pages/Services';
import Pricing from './Pages/Pricing';
import Contact from './Pages/Contact';
import Marketing from './Pages/Marketing';

import './App.css';

// Public layout
const MarketingLayout = ({ children }) => (
  <div className="marketing-container">
    <WelcomeNavBar />
    {children}
  </div>
);

// Protected layout
const ProtectedLayout = ({ children }) => (
  <div className="dashboard-container">
    <Sidebar />
    <div className="main-content">{children}</div>
  </div>
);

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<MarketingLayout><Welcome /></MarketingLayout>} />
      <Route path="/about" element={<MarketingLayout><About /></MarketingLayout>} />
      <Route path="/services" element={<MarketingLayout><Services /></MarketingLayout>} />
      <Route path="/pricing" element={<MarketingLayout><Pricing /></MarketingLayout>} />
      <Route path="/contact" element={<MarketingLayout><Contact /></MarketingLayout>} />
      <Route path="/login" element={<MarketingLayout><Login /></MarketingLayout>} />
      <Route path="/register" element={<MarketingLayout><Register /></MarketingLayout>} />

      {/* Protected routes */}
      <Route path="/dashboard" element={<ProtectedLayout><Dashboard /></ProtectedLayout>} />
      <Route path="/orders" element={<ProtectedLayout><Orders /></ProtectedLayout>} />
      <Route path="/products" element={<ProtectedLayout><Products /></ProtectedLayout>} />
      <Route path="/customers" element={<ProtectedLayout><Customers /></ProtectedLayout>} />
      <Route path="/addproduct" element={<ProtectedLayout><AddProduct /></ProtectedLayout>} />
      <Route path="/editproduct/:id" element={<ProtectedLayout><EditProduct /></ProtectedLayout>} />
      <Route path="/marketing" element={<ProtectedLayout><Marketing /></ProtectedLayout>} />
    </Routes>
  );
}

export default App;
