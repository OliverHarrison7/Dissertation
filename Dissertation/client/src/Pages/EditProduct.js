// client/src/Pages/EditProduct.js
import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, TextField, Button, MenuItem, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    name: '',
    status: 'Active',
    inventory: '',
    type: '',
    vendor: '',
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProductData(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        alert('Failed to load product data.');
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/products/${id}`, productData);
      console.log('Product updated:', response.data);
      alert('Product updated successfully!');
      navigate('/products');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>Edit Product</Typography>
        <Button variant="outlined" color="secondary" sx={{ mb: 2 }} onClick={() => navigate('/products')}>
          Back to Products
        </Button>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField 
            label="Product Name" 
            name="name" 
            fullWidth 
            margin="normal" 
            value={productData.name} 
            onChange={handleChange} 
            required 
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
              Update Product
            </Button>
            <Button type="button" variant="outlined" color="secondary">
              Reset
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default EditProduct;
