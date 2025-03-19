import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: '',
    status: 'Active',
    inventory: '',
    type: '',
    vendor: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can call your API or update global state to add the product
    console.log('New Product Data:', productData);
    alert('Product added successfully!');
    
    // Optionally, update your global state or call an API here
    
    // Reset the form after submission
    setProductData({
      name: '',
      status: 'Active',
      inventory: '',
      type: '',
      vendor: '',
    });
    
    // Navigate back to the products page (ensure /products is correct)
    navigate('/products');
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 4,
          p: 3,
          border: '1px solid #ccc',
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Add New Product
        </Typography>

        {/* Back to Products Button */}
        <Button
          variant="outlined"
          color="secondary"
          sx={{ mb: 2 }}
          onClick={() => navigate('/products')}
        >
          Back to Products
        </Button>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Product Name"
            name="name"
            fullWidth
            margin="normal"
            value={productData.name}
            onChange={handleChange}
          />
          <TextField
            select
            label="Status"
            name="status"
            fullWidth
            margin="normal"
            value={productData.status}
            onChange={handleChange}
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Draft">Draft</MenuItem>
            <MenuItem value="Archived">Archived</MenuItem>
          </TextField>
          <TextField
            label="Inventory"
            name="inventory"
            fullWidth
            margin="normal"
            value={productData.inventory}
            onChange={handleChange}
          />
          <TextField
            label="Type"
            name="type"
            fullWidth
            margin="normal"
            value={productData.type}
            onChange={handleChange}
          />
          <TextField
            label="Vendor"
            name="vendor"
            fullWidth
            margin="normal"
            value={productData.vendor}
            onChange={handleChange}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Add Product
            </Button>
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              onClick={() =>
                setProductData({
                  name: '',
                  status: 'Active',
                  inventory: '',
                  type: '',
                  vendor: '',
                })
              }
            >
              Reset
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default AddProduct;
