import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

// Material UI imports
import {
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

function Orders() {
  // State for CSV data
  const [orders, setOrders] = useState([]);
  // State for date range, filter, search
  const [dateRange, setDateRange] = useState('30 days');
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Load CSV data with PapaParse
  useEffect(() => {
    Papa.parse('/synthetic_ecommerce_data.csv', {
      download: true,
      header: true,
      complete: (results) => {
        console.log("Parsed CSV data:", results.data);
        setOrders(results.data);
      },
      error: (err) => {
        console.error("Error parsing CSV:", err);
      }
    });
  }, []);

  // Example top metrics (you might calculate from the CSV)
  const ordersCount = 1271;
  const orderedItems = 31;
  const returnedItems = 6;
  const fulfilledOrders = 41;

  // Filter logic
  const filteredOrders = orders.filter(order => {
    // Quick text search in Date or other columns
    const matchesSearch = search.trim() === '' ||
      (order.Date && order.Date.toLowerCase().includes(search.toLowerCase()));

    // Example filter logic
    // If filter === 'all', we show all
    // If filter === 'unpaid', show only where PaymentStatus = "unpaid", etc.
    // Adjust to match your CSV columns
    if (filter === 'all') {
      return matchesSearch;
    } else if (filter === 'unpaid') {
      return matchesSearch && order.PaymentStatus === 'unpaid';
    } else if (filter === 'open') {
      // Example: "open" means not fulfilled
      return matchesSearch && order.FulfillmentStatus !== 'Fulfilled';
    }
    return matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

  const handleDateRangeChange = (event) => {
    setDateRange(event.target.value);
    // In a real app, you might filter or reload data based on dateRange
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setCurrentPage(1);
  };

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
    <Box sx={{ p: 2, fontFamily: 'Arial, sans-serif' }}>
      {/* Top Bar */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h5">Orders</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <FormControl size="small">
            <InputLabel>Date Range</InputLabel>
            <Select
              value={dateRange}
              label="Date Range"
              onChange={handleDateRangeChange}
            >
              <MenuItem value="7 days">7 days</MenuItem>
              <MenuItem value="30 days">30 days</MenuItem>
              <MenuItem value="90 days">90 days</MenuItem>
            </Select>
          </FormControl>
          <Button variant="outlined">Export</Button>
          <Button variant="outlined">More actions</Button>
          <Button variant="contained" sx={{ backgroundColor: '#333' }}>
            Create order
          </Button>
        </Box>
      </Box>

      {/* Stats Row */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Paper sx={{ flex: 1, p: 2, textAlign: 'center' }}>
          <Typography variant="h6">{ordersCount}</Typography>
          <Typography variant="body2" color="text.secondary">
            Orders
          </Typography>
        </Paper>
        <Paper sx={{ flex: 1, p: 2, textAlign: 'center' }}>
          <Typography variant="h6">{orderedItems}</Typography>
          <Typography variant="body2" color="text.secondary">
            Ordered items
          </Typography>
        </Paper>
        <Paper sx={{ flex: 1, p: 2, textAlign: 'center' }}>
          <Typography variant="h6">{returnedItems}</Typography>
          <Typography variant="body2" color="text.secondary">
            Returned items
          </Typography>
        </Paper>
        <Paper sx={{ flex: 1, p: 2, textAlign: 'center' }}>
          <Typography variant="h6">{fulfilledOrders}</Typography>
          <Typography variant="body2" color="text.secondary">
            Fulfilled orders
          </Typography>
        </Paper>
      </Box>

      {/* Filter Bar */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mb: 2
        }}
      >
        {/* Quick filters */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <FormControl size="small">
            <InputLabel>Filter</InputLabel>
            <Select
              value={filter}
              label="Filter"
              onChange={handleFilterChange}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="unpaid">Unpaid</MenuItem>
              <MenuItem value="open">Open</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {/* Search Field */}
        <TextField
          size="small"
          placeholder="Search orders..."
          value={search}
          onChange={handleSearchChange}
        />
      </Box>

      {/* Orders Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Visitors</TableCell>
              <TableCell>Orders</TableCell>
              <TableCell>Conversion Rate</TableCell>
              <TableCell>Average Order Value</TableCell>
              <TableCell>Revenue</TableCell>
              <TableCell>COGS</TableCell>
              <TableCell>Marketing Spend</TableCell>
              <TableCell>Refunds</TableCell>
              <TableCell>Profit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedOrders.map((order, index) => (
              <TableRow key={index}>
                <TableCell>{order.Date}</TableCell>
                <TableCell>{order.Visitors}</TableCell>
                <TableCell>{order.Orders}</TableCell>
                <TableCell>{order.Conversion_Rate}</TableCell>
                <TableCell>{order.Average_Order_Value}</TableCell>
                <TableCell>{order.Revenue}</TableCell>
                <TableCell>{order.COGS}</TableCell>
                <TableCell>{order.Marketing_Spend}</TableCell>
                <TableCell>{order.Refunds}</TableCell>
                <TableCell>{order.Profit}</TableCell>
              </TableRow>
            ))}
            {paginatedOrders.length === 0 && (
              <TableRow>
                <TableCell colSpan={10} align="center" sx={{ py: 4 }}>
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Controls */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 1 }}>
        <Button
          variant="outlined"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          variant="outlined"
          onClick={handleNextPage}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </Button>
        <Typography variant="body2" sx={{ alignSelf: 'center' }}>
          Page {currentPage} of {totalPages || 1}
        </Typography>
      </Box>
    </Box>
  );
}

export default Orders;
