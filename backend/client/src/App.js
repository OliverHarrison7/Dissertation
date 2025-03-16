// client/src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Orders from './Pages/Orders';
import Dashboard from './Pages/Dashboard';
import Products from './Pages/Products';
import './App.css'; // Global styles

function App() {
  const [users, setUsers] = useState([]);

  // Example: Fetch users data from backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
      .then(response => setUsers(response.data))
      .catch(console.error);
  }, []);

  return (
    <Router>
      <div className="dashboard-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            {/* Route for your main dashboard page */}
            <Route path="/dashboard" element={<Dashboard users={users} />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/products" element={<Products />} />
            {/* Add more routes here */}
            {/* Default route goes to Dashboard as well */}
            <Route path="/" element={<Dashboard users={users} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
