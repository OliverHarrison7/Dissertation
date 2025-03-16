// client/src/Pages/Dashboard.js
import React from 'react';
import ShinyDashboard from '../components/ShinyDashboard';

function Dashboard({ users }) {
  return (
    <div>
      <h1>Overview Dashboard</h1>
      
 

      {/* Embed the Shiny dashboard below the metrics */}
      <div style={{ marginTop: '40px' }}>
        <ShinyDashboard />
      </div>
    </div>
  );
}

export default Dashboard;
