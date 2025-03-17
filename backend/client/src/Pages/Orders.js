import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './Orders.css';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // number of rows per page

  useEffect(() => {
    // Parse the CSV from the public folder
    Papa.parse('/synthetic_ecommerce_data.csv', {
      download: true,
      header: true,
      complete: (results) => {
        console.log("Parsed CSV data:", results.data);
        if (results.data.length > 0) {
          console.log("Column keys:", Object.keys(results.data[0]));
        }
        setOrders(results.data);
      },
      error: (err) => {
        console.error("Error parsing CSV:", err);
      }
    });
    
  }, []);

  // Filter by Date (or adjust if you want to filter by something else)
  const filteredOrders = orders.filter(order =>
    search.trim() === '' ||
    (order.Date && order.Date.toLowerCase().includes(search.toLowerCase()))
  );

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

  // Handlers
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="orders-page">
      <h1>Orders</h1>

      <div className="orders-header">
        <p className="order-count">
          <strong>{filteredOrders.length}</strong> Orders
        </p>
        <p className="pagination-info">
          Page {currentPage} of {totalPages || 1}
        </p>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by Date..."
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      <table className="orders-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Visitors</th>
            <th>Orders</th>
            <th>Conversion Rate</th>
            <th>Average Order Value</th>
            <th>Revenue</th>
            <th>COGS</th>
            <th>Marketing Spend</th>
            <th>Refunds</th>
            <th>Profit</th>
          </tr>
        </thead>
        <tbody>
          {paginatedOrders.map((order, index) => (
            <tr key={index}>
              <td>{order.Date}</td>
              <td>{order.Visitors}</td>
              <td>{order.Orders}</td>
              <td>{order.Conversion_Rate}</td>
              <td>{order.Average_Order_Value}</td>
              <td>{order.Revenue}</td>
              <td>{order.COGS}</td>
              <td>{order.Marketing_Spend}</td>
              <td>{order.Refunds}</td>
              <td>{order.Profit}</td>
            </tr>
          ))}
          {paginatedOrders.length === 0 && (
            <tr>
              <td colSpan="10" className="no-orders">No orders found.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination-controls">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Orders;
