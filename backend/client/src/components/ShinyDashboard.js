// client/src/components/ShinyDashboard.js
import React from 'react';

const ShinyDashboard = () => {
  return (
    <div style={{ width: '100%', height: '600px', border: '1px solid #ccc' }}>
      <iframe
        title="Shiny Dashboard"
        src="http://127.0.0.1:4929" // Replace with the URL of your running Shiny app
        style={{ width: '100%', height: '100%', border: 'none' }}
      />
    </div>
  );
};

export default ShinyDashboard;
