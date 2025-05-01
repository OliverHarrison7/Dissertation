import React, { useState, useEffect, useRef } from 'react';
import Papa from 'papaparse';
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
  TableRow
} from '@mui/material';

function Orders() {
  const [orders, setOrders] = useState([]);

  // State for date range, filter, search
  const [dateRange, setDateRange] = useState('30 days');
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const fileInputRef = useRef(null);

  // 1) Fetch orders from backend on mount
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/orders');
      if (!res.ok) throw new Error('Failed to fetch orders');
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  // 2) CSV import: parse, then POST each row to /api/orders
  const handleImportCSV = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        console.log("Parsed CSV data:", results.data);
        for (const row of results.data) {
          // Adjust column references if your CSV differs
          const body = {
            order_date: row.Date || '',
            visitors: Number(row.Visitors) || 0,
            orders: Number(row.Orders) || 0,
            conversion_rate: Number(row.Conversion_Rate) || 0,
            average_order_value: Number(row.Average_Order_Value) || 0,
            revenue: Number(row.Revenue) || 0,
            cogs: Number(row.COGS) || 0,
            marketing_spend: Number(row.Marketing_Spend) || 0,
            refunds: Number(row.Refunds) || 0,
            profit: Number(row.Profit) || 0
          };

          // If we require order_date, skip if empty:
          if (!body.order_date) continue;

          try {
            const res = await fetch('http://localhost:5000/api/orders', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(body)
            });
            if (!res.ok) {
              console.error('Error posting row:', row);
            }
          } catch (error) {
            console.error('Error in POST request:', error);
          }
        }
        // After all rows are posted, reload from backend
        fetchOrders();
        setCurrentPage(1);
      },
      error: (err) => {
        console.error("Error parsing CSV:", err);
      }
    });
  };

  // Stats from the "orders" array
  const ordersCount = orders.reduce((acc, row) => acc + (row.orders || 0), 0);
  const orderedItems = ordersCount;
  const returnedItems = orders.reduce((acc, row) => acc + (row.refunds || 0), 0);
  const fulfilledOrders = ordersCount - returnedItems;

  // Filter + search logic (modify to suit your DB columns)
  const filteredOrders = orders.filter((order) => {
    // quick text search in order_date or other columns
    const matchesSearch =
      search.trim() === '' ||
      (order.order_date && order.order_date.toLowerCase().includes(search.toLowerCase()));

    // example filter logic
    if (filter === 'all') {
      return matchesSearch;
    } else if (filter === 'unpaid') {
      // you might have an "unpaid" column or status in your DB
      return matchesSearch && order.status === 'unpaid';
    } else if (filter === 'open') {
      // means not fulfilled
      return matchesSearch && order.status !== 'Fulfilled';
    }
    return matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

  // Handlers
  const handleDateRangeChange = (event) => {
    setDateRange(event.target.value);
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
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
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
              {/* Adjust columns to match your DB or CSV columns */}
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
                <TableCell>{order.order_date}</TableCell>
                <TableCell>{order.visitors}</TableCell>
                <TableCell>{order.orders}</TableCell>
                <TableCell>{order.conversion_rate}</TableCell>
                <TableCell>{order.average_order_value}</TableCell>
                <TableCell>{order.revenue}</TableCell>
                <TableCell>{order.cogs}</TableCell>
                <TableCell>{order.marketing_spend}</TableCell>
                <TableCell>{order.refunds}</TableCell>
                <TableCell>{order.profit}</TableCell>
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

      {/* Import CSV Button & Hidden Input */}
      <Box sx={{ mt: 2 }}>
        <Button variant="outlined" onClick={handleImportCSV}>
          Import CSV
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept=".csv"
          style={{ display: 'none' }}
        />
      </Box>
    </Box>
  );
}

export default Orders;
