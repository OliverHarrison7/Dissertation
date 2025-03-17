import React, { useState, useEffect } from 'react';

function Orders() {
 
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; 

  useEffect(() => {
    // Example mock data
    const mockOrders = [
      {
        id: 1001,
        orderDate: '12/01/2025',
        dueDate: '12/05/2025',
        customer: 'John Doe',
        lineItems: 'Test Line Item Title 1',
        customerNotes: 'Test note about the customer.',
        teamNotes: 'No team notes yet.',
        status: 'Shipped'
      },
      {
        id: 1002,
        orderDate: '12/01/2025',
        dueDate: '12/06/2025',
        customer: 'Jane Smith',
        lineItems: 'Another item set',
        customerNotes: 'Customer requested gift wrap.',
        teamNotes: 'Assigned to Team A.',
        status: 'Open'
      },
      
    ];

    // For demonstration, let's pretend we have 1092 open orders
    // by duplicating or randomly generating more entries
    const largeOrderList = [];
    for (let i = 0; i < 30; i++) {
      largeOrderList.push(...mockOrders.map((o) => ({ ...o, id: o.id + i * 100 })));
    }
   

    setOrders(largeOrderList);
  }, []);

  // Filter orders by searching customer name
  const filteredOrders = orders.filter((order) =>
    order.customer.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredOrders.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

  // Handlers
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // reset to page 1 on new search
  };

  const handleExportOrders = () => {
    
    alert('Export Orders clicked!');
  };

  return (
    <div className="orders-container" style={{ padding: '20px' }}>
      {/* Header */}
      <div className="orders-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Open Orders</h2>
        <div>
          <button onClick={handleExportOrders} style={{ marginRight: '10px' }}>Export Orders</button>
         
        </div>
      </div>

      {/* Sub-header: count and pagination info */}
      <div className="orders-subheader" style={{ margin: '10px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          {/* Show total count of open orders */}
          <strong>{filteredOrders.length}</strong> Open Orders
        </div>
        <div>Page {currentPage} of {totalPages || 1}</div>
      </div>

      {/* Search / filter bar */}
      <div className="orders-filter" style={{ marginBottom: '15px' }}>
        <input
          type="text"
          placeholder="Search by customer..."
          value={search}
          onChange={handleSearchChange}
          style={{ padding: '8px', width: '250px' }}
        />
      </div>

      {/* Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff' }}>
        <thead>
          <tr style={{ backgroundColor: '#f9f9f9' }}>
            <th style={thStyle}>Order #</th>
            <th style={thStyle}>Order Date</th>
            <th style={thStyle}>Due Date</th>
            <th style={thStyle}>Customer</th>
            <th style={thStyle}>Line Items</th>
            <th style={thStyle}>Customer Notes</th>
            <th style={thStyle}>Team Notes</th>
            <th style={thStyle}>Status</th>
          </tr>
        </thead>
        <tbody>
          {paginatedOrders.map((order) => (
            <tr key={order.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={tdStyle}>{order.id}</td>
              <td style={tdStyle}>{order.orderDate}</td>
              <td style={tdStyle}>{order.dueDate}</td>
              <td style={tdStyle}>{order.customer}</td>
              <td style={tdStyle}>{order.lineItems}</td>
              <td style={tdStyle}>{order.customerNotes}</td>
              <td style={tdStyle}>{order.teamNotes}</td>
              <td style={tdStyle}>{order.status}</td>
            </tr>
          ))}
          {paginatedOrders.length === 0 && (
            <tr>
              <td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>
                No orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Simple pagination controls */}
      <div className="pagination-controls" style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          style={{ marginRight: '10px' }}
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
}

// Inline styles for table headers/cells
const thStyle = {
  textAlign: 'left',
  padding: '12px',
  borderBottom: '1px solid #eee'
};

const tdStyle = {
  padding: '12px'
};

export default Orders;
