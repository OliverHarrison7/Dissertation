import React, { useState, useEffect } from 'react';
import './Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedProductIds, setSelectedProductIds] = useState([]);

  useEffect(() => {
    // Mock data for demonstration; replace with real data from an API
    const mockProducts = [
      {
        id: 1,
        name: 'Bracelet',
        status: 'Active',
        inventory: 'In stock for 3 variants',
        type: 'Jewelry',
        vendor: 'My Brand',
      },
      {
        id: 2,
        name: 'Chatrual Sorook Peach Soju',
        status: 'Active',
        inventory: 'In stock',
        type: 'Beverage',
        vendor: 'Premium Drinks',
      },
      {
        id: 3,
        name: 'Diamonds Bracelet',
        status: 'Draft',
        inventory: 'In stock for 2 variants',
        type: 'Jewelry',
        vendor: 'Diamonds Inc.',
      },
      {
        id: 4,
        name: 'Premium Dry Gin',
        status: 'Active',
        inventory: 'In stock',
        type: 'Beverage',
        vendor: 'Premium Drinks',
      },
      {
        id: 5,
        name: 'Premium Leather Shoes',
        status: 'Archived',
        inventory: 'In stock',
        type: 'Footwear',
        vendor: 'Shoe Maker',
      },
    ];
    setProducts(mockProducts);
  }, []);

  // Filter by status and search
  const filteredProducts = products.filter((product) => {
    const matchesStatus =
      statusFilter === 'all' || product.status.toLowerCase() === statusFilter;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Handle bulk selection
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      // Select all visible products
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

  // Example: bulk action placeholders
  const handleEditProducts = () => {
    alert('Edit products action triggered');
  };

  const handleMoreActions = () => {
    alert('More actions dropdown triggered');
  };

  const handleAddProduct = () => {
    alert('Navigating to Add Product page');
  };

  const handleExport = () => {
    alert('Exporting products');
  };

  const handleImport = () => {
    alert('Importing products');
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
