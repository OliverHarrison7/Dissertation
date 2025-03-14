// Dashboard.js
import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      <div className="cards-grid">
        <div className="card">
          <h2>Total Sales</h2>
          <p>$123,456</p>
        </div>
        <div className="card">
          <h2>Orders</h2>
          <p>234</p>
        </div>
        <div className="card">
          <h2>Customers</h2>
          <p>45</p>
        </div>
        <div className="card">
          <h2>Profit</h2>
          <p>$12,345</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
