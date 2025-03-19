import React, { useState, useEffect, useRef } from 'react';
import Papa from 'papaparse';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Fetch products from your backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Adjust port/URL as needed for your server
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

  // Bulk selection
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allVisibleIds = filteredProducts.map((p) => p.id);
      setSelectedProductIds(allVisibleIds);
    } else {
      setSelectedProductIds([]);
    }
  };

  const handleSelectOne = (productId, checked) => {
    if (checked) {
      setSelectedProductIds((prev) => [...prev, productId]);
    } else {
      setSelectedProductIds((prev) => prev.filter((id) => id !== productId));
    }
  };

  const allVisibleSelected =
    filteredProducts.length > 0 &&
    filteredProducts.every((p) => selectedProductIds.includes(p.id));

  // Bulk actions
  const handleEditProducts = () => {
    alert('Edit products action triggered');
  };

  const handleMoreActions = () => {
    alert('More actions dropdown triggered');
  };

  // Navigate to AddProduct page
  const handleAddProduct = () => {
    // IMPORTANT: match the route path="/addproduct" in App.js
    navigate('/addproduct');
  };

  // CSV Export
  const handleExport = () => {
    const csv = Papa.unparse(products);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'products.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // CSV Import
  const handleImport = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const importedProducts = results.data.map((row, index) => ({
          id: row.id || Date.now() + index,
          name: row.name || '',
          status: row.status || '',
          inventory: row.inventory || '',
          type: row.type || '',
          vendor: row.vendor || '',
        }));
        setProducts((prev) => [...prev, ...importedProducts]);
      },
      error: (error) => {
        console.error('CSV parsing error:', error);
      },
    });
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

      {/* Bulk actions */}
      {selectedProductIds.length > 0 && (
        <div className="bulk-actions">
          <span>{selectedProductIds.length} selected</span>
          <button onClick={handleEditProducts}>Edit products</button>
          <button onClick={handleMoreActions}>More actions</button>
        </div>
      )}

      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Filter products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Export/Import bar */}
      <div className="export-import-bar">
        <button onClick={handleExport}>Export</button>
        <button onClick={handleImport}>Import</button>
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />

      {/* Products table */}
      <table className="products-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={allVisibleSelected && filteredProducts.length > 0}
              />
            </th>
            <th>Product</th>
            <th>Status</th>
            <th>Inventory</th>
            <th>Type</th>
            <th>Vendor</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => {
            const isChecked = selectedProductIds.includes(product.id);
            return (
              <tr key={product.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) =>
                      handleSelectOne(product.id, e.target.checked)
                    }
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.status}</td>
                <td>{product.inventory}</td>
                <td>{product.type}</td>
                <td>{product.vendor}</td>
              </tr>
            );
          })}
          {filteredProducts.length === 0 && (
            <tr>
              <td colSpan="6" className="no-products">
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
