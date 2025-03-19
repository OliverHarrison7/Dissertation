import React from 'react';

const ShinyDashboard = () => {
  return (
    <div style={{ width: '100%', height: '600px', border: '1px solid #ccc' }}>
      <iframe
        title="Shiny Dashboard"
        src="http://127.0.0.1:7332/" 
        style={{ width: '100%', height: '100%', border: 'none' }}
      />
    </div>
  );
};

export default ShinyDashboard;
