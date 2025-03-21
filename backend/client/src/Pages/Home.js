import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Grid, Paper, Card, CardContent, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import PeopleIcon from '@mui/icons-material/People';
import axios from 'axios';

function Home() {
  // State to hold fetched data from various endpoints
  const [ordersData, setOrdersData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [customersData, setCustomersData] = useState([]);

  // Fetch data from backend on mount
  useEffect(() => {
    // Replace baseURL if needed
    axios.get('http://localhost:5000/api/orders')
      .then(res => setOrdersData(res.data))
      .catch(err => console.error('Error fetching orders:', err));

    axios.get('http://localhost:5000/api/products')
      .then(res => setProductsData(res.data))
      .catch(err => console.error('Error fetching products:', err));

    axios.get('http://localhost:5000/api/customers')
      .then(res => setCustomersData(res.data))
      .catch(err => console.error('Error fetching customers:', err));
  }, []);

  // Compute some simple metrics from fetched data:
  const totalOrders = ordersData.reduce((acc, order) => acc + Number(order.orders || 0), 0);
  const totalSales = ordersData.reduce((acc, order) => acc + Number(order.revenue || 0), 0);
  const totalCustomers = customersData.length;
  const totalProducts = productsData.length;

  return (
    <Box sx={{ backgroundColor: '#f9fafb', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 4, p: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
            Welcome to Your Store Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Your key metrics are updated in real-time.
          </Typography>
        </Box>

        {/* Metrics Cards */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <ShoppingCartIcon sx={{ fontSize: 40, color: '#1976d2' }} />
              <Typography variant="h6" sx={{ mt: 1 }}>Total Orders</Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                {totalOrders}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <AttachMoneyIcon sx={{ fontSize: 40, color: '#2e7d32' }} />
              <Typography variant="h6" sx={{ mt: 1 }}>Total Sales</Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
                ${totalSales.toFixed(2)}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <PeopleIcon sx={{ fontSize: 40, color: '#f57c00' }} />
              <Typography variant="h6" sx={{ mt: 1 }}>Customers</Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#f57c00' }}>
                {totalCustomers}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <ShowChartIcon sx={{ fontSize: 40, color: '#9c27b0' }} />
              <Typography variant="h6" sx={{ mt: 1 }}>Products</Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#9c27b0' }}>
                {totalProducts}
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Quick Actions Section */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
            Quick Actions
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ boxShadow: 2 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Manage Products
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Update product details, inventory, and pricing.
                  </Typography>
                  <Button variant="contained">Go to Products</Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ boxShadow: 2 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    View Orders
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Track, fulfill, and manage your orders efficiently.
                  </Typography>
                  <Button variant="contained" color="success">
                    Go to Orders
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ boxShadow: 2 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Explore Analytics
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Dive into detailed store performance metrics.
                  </Typography>
                  <Button variant="contained" color="secondary">
                    Go to Analytics
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default Home;
