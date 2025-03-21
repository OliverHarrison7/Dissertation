import React from 'react';

const ShinyDashboard = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0 }}>
      <iframe
        title="Shiny Dashboard"
        src="https://oli7777777.shinyapps.io/dissertationr/"  // Use your deployed URL here
        style={{ width: '100%', height: '100%', border: 'none', margin: 0, padding: 0 }}
      />
    </div>
  );
};

export default ShinyDashboard;
