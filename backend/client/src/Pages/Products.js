import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const navigate = useNavigate();

  // Fetch products from your backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  // Filtered list
  const filteredProducts = products.filter((product) => {
    const matchesStatus =
      statusFilter === 'all' ||
      product.status.toLowerCase() === statusFilter;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Navigate to AddProduct page
  const handleAddProduct = () => {
    navigate('/addproduct');
  };

  return (
    <div className="products-page">
      <h1>Products</h1>
      
      {/* Top bar */}
      <div className="top-bar">
        <div className="top-bar-left">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value.toLowerCase())}
            className="filter-select"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
          <button onClick={() => alert('Opening more filters...')}>
            More filters
          </button>
        </div>
        <div className="top-bar-right">
          <button onClick={handleAddProduct}>Add product</button>
        </div>
      </div>
      
      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Filter products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      
      {/* Products table */}
      <table className="products-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Status</th>
            <th>Inventory</th>
            <th>Type</th>
            <th>Vendor</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.status}</td>
                <td>{product.inventory}</td>
                <td>{product.type}</td>
                <td>{product.vendor}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-products">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
