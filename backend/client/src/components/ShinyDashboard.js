import React from 'react';

const ShinyDashboard = () => {
  return (
  
    <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0 }}>
      <iframe
        title="Shiny Dashboard"
        src="http://127.0.0.1:3632/"
        style={{ width: '100%', height: '100%', border: 'none', margin: 0, padding: 0 }}
      />
    </div>
  );
};

export default ShinyDashboard;
