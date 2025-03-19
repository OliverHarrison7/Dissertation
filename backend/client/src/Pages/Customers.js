import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Papa from 'papaparse';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState('');

  // Reference to the hidden file input element
  const fileInputRef = useRef(null);

  useEffect(() => {
    const sampleCustomers = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        totalOrders: 12,
        totalSpent: 1500,
        lastOrder: '2025-03-10',
        tags: 'VIP'
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        totalOrders: 5,
        totalSpent: 500,
        lastOrder: '2025-03-08',
        tags: 'New'
      },
      {
        id: 3,
        name: 'Michael Brown',
        email: 'michael.brown@example.com',
        totalOrders: 8,
        totalSpent: 950,
        lastOrder: '2025-03-09',
        tags: 'Loyal'
      }
    ];
    setCustomers(sampleCustomers);

    // Uncomment this to fetch from your API:
    // axios.get('http://localhost:5000/api/customers')
    //   .then((response) => setCustomers(response.data))
    //   .catch(console.error);
  }, []);

  // Search functionality
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Filtered list of customers
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(search.toLowerCase()) ||
    customer.email.toLowerCase().includes(search.toLowerCase())
  );

  // DataGrid column definitions
  const columns = [
    { field: 'name', headerName: 'Customer Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'totalOrders', headerName: 'Total Orders', type: 'number', width: 150 },
    { field: 'totalSpent', headerName: 'Total Spent ($)', type: 'number', width: 150 },
    { field: 'lastOrder', headerName: 'Last Order Date', width: 150 },
    { field: 'tags', headerName: 'Tags', flex: 1 }
  ];

  // Top-level metrics
  const totalCustomers = customers.length;
  const newCustomers = Math.round(totalCustomers * 0.2); // example ratio
  const returningCustomers = totalCustomers - newCustomers;
  const avgCLV =
    totalCustomers > 0
      ? (
          customers.reduce((sum, cust) => sum + cust.totalSpent, 0) /
          totalCustomers
        ).toFixed(2)
      : 0;

  // Handle CSV Import
  const handleImportClick = () => {
    // Programmatically click the hidden file input
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
        // Transform CSV data into our customer shape
        const importedCustomers = results.data.map((row, index) => ({
          id: row.id || Date.now() + index, // fallback if no ID column
          name: row.name || '',
          email: row.email || '',
          totalOrders: Number(row.totalOrders) || 0,
          totalSpent: Number(row.totalSpent) || 0,
          lastOrder: row.lastOrder || '',
          tags: row.tags || ''
        }));

        // Merge imported data with existing customers
        setCustomers((prev) => [...prev, ...importedCustomers]);
      },
      error: (error) => {
        console.error('CSV parsing error:', error);
      }
    });
  };

  // Handle CSV Export
  const handleExportClick = () => {
    const csv = Papa.unparse(customers);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'customers.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Customers
      </Typography>

      {/* Top Metrics */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h5">{totalCustomers}</Typography>
            <Typography variant="body2">Total Customers</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h5">{newCustomers}</Typography>
            <Typography variant="body2">New Customers</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h5">{returningCustomers}</Typography>
            <Typography variant="body2">Returning Customers</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h5">${avgCLV}</Typography>
            <Typography variant="body2">Avg. CLV</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Search and Import/Export Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <TextField
          label="Search Customers"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
          sx={{ width: '300px' }}
        />
        <Box>
          {/* Import CSV */}
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleImportClick}
            sx={{ mr: 2 }}
          >
            Import CSV
          </Button>

          {/* Export CSV */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleExportClick}
          >
            Export CSV
          </Button>

          {/* Hidden file input for CSV import */}
          <input
            type="file"
            accept=".csv"
            ref={fileInputRef}
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
        </Box>
      </Box>

      {/* DataGrid for Customer List */}
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={filteredCustomers}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          autoHeight
          aria-label="Customer List"
        />
      </Box>
    </Container>
  );
};

export default Customers;
