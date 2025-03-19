// client/src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WelcomeNavBar from './components/WelcomeNavBar'; // Your marketing navbar
import Sidebar from './components/Sidebar';

import Welcome from './Pages/Welcome';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import Orders from './Pages/Orders';
import Products from './Pages/Products';
import About from './Pages/About';
import Services from './Pages/Services';
import Pricing from './Pages/Pricing';
import Contact from './Pages/Contact';
import Customers from './Pages/Customers';
import AddProduct from './Pages/AddProduct';

import './App.css';

// Marketing/Public layout: uses WelcomeNavBar for all public pages
const MarketingLayout = ({ children }) => (
  <div className="marketing-container">
    <WelcomeNavBar />
    {children}
  </div>
);

// Protected layout: uses sidebar and (optionally) a different navbar
const ProtectedLayout = ({ children }) => (
  <div className="dashboard-container">
    {/* If you want a different NavBar for the dashboard, import it and place it here */}
    <Sidebar />
    <div className="main-content">
      {children}
    </div>
  </div>
);

function App() {
  return (
    <Routes>
      {/* All public pages share the same layout (WelcomeNavBar) */}
      <Route path="/" element={<MarketingLayout><Welcome /></MarketingLayout>} />
      <Route path="/about" element={<MarketingLayout><About /></MarketingLayout>} />
      <Route path="/services" element={<MarketingLayout><Services /></MarketingLayout>} />
      <Route path="/pricing" element={<MarketingLayout><Pricing /></MarketingLayout>} />
      <Route path="/contact" element={<MarketingLayout><Contact /></MarketingLayout>} />
      <Route path="/login" element={<MarketingLayout><Login /></MarketingLayout>} />
      <Route path="/register" element={<MarketingLayout><Register /></MarketingLayout>} />

      {/* Protected pages (sidebar, etc.) */}
      <Route path="/dashboard" element={<ProtectedLayout><Dashboard /></ProtectedLayout>} />
      <Route path="/orders" element={<ProtectedLayout><Orders /></ProtectedLayout>} />
      <Route path="/products" element={<ProtectedLayout><Products /></ProtectedLayout>} />
      <Route path="/customers" element={<ProtectedLayout><Customers /></ProtectedLayout>} />
      <Route path="/addproduct" element={<ProtectedLayout><AddProduct /></ProtectedLayout>} />
    </Routes>
  );
}

export default App;
