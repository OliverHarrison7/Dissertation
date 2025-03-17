import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Sidebar from './components/Sidebar';
import Orders from './Pages/Orders';
import Dashboard from './Pages/Dashboard';
import Products from './Pages/Products';
import './App.css'; 

function App() {
  const [users, setUsers] = useState([]);

  
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
            {/* Route for main dashboard page */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
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
