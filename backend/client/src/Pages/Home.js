import React from 'react';

function Home() {
  return (
    <div style={{ padding: '20px' }}>
      {/* Main title */}
      <h1 style={{ fontSize: '2rem', margin: 0 }}>Welcome to Your Store</h1>

      {/* Tagline or brief description */}
      <p style={{ fontSize: '1.2rem', color: '#666', marginTop: '8px' }}>
        Here’s what’s happening in your store today.
      </p>

      {/* Placeholder or brief instructions */}
      <div style={{ marginTop: '20px' }}>
        <p>Use the sidebar to navigate through your orders, products, analytics, and more.</p>
      </div>
    </div>
  );
}

export default Home;
