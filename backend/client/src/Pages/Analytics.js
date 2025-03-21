import React from 'react';
import ShinyDashboard from '../components/ShinyDashboard';

function Dashboard({ users }) {
  return (
    <div>
      <h1>Analytics</h1>
      
 

      {/* Display the number of users */}
      <div style={{ marginTop: '40px' }}>
        <ShinyDashboard />
      </div>
    </div>
  );
}

export default Dashboard;
