// client/src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './Pages/Dashboard';
// import other pages if you have them (Orders, Products, etc.)
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  // Example: if you have users data that might be shown on a different page
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
            <Route path="/dashboard" element={<Dashboard users={users} />} />
            {/* Other routes can go here */}
            <Route path="/" element={<Dashboard users={users} />} /> {/* Default route */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;