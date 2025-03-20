import React, { useState, useEffect, useRef } from 'react';
import Papa from 'papaparse';
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

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState('');
  const fileInputRef = useRef(null);

  // DataGrid columns
  const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'total_orders', headerName: 'Total Orders', width: 120 },
    { field: 'total_spent', headerName: 'Total Spent ($)', width: 140 },
    { field: 'last_order', headerName: 'Last Order', width: 120 },
    { field: 'tags', headerName: 'Tags', flex: 1 },
  ];

  // 1) Load existing customers from the backend on mount
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/customers');
      if (!res.ok) throw new Error('Failed to fetch customers');
      const data = await res.json();
      // MUI DataGrid requires an "id" prop; use DB's id
      const withId = data.map((cust) => ({ ...cust, id: cust.id }));
      setCustomers(withId);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  // 2) CSV Import: parse & POST each row to backend
  const handleImportClick = () => {
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
        const rows = results.data;
        console.log("Parsed CSV data:", rows);

        // For each CSV row, POST to /api/customers
        for (const row of rows) {
          const body = {
            name: row.Name || '',
            email: row.Email || '',
            total_orders: Number(row.Total_Orders) || 0,
            total_spent: Number(row.Total_Spent) || 0,
            last_order: row.Last_Order_Date || '',
            tags: row.Tags || ''
          };

          // Skip empty name/email rows
          if (!body.name || !body.email) continue;

          try {
            const res = await fetch('http://localhost:5000/api/customers', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(body)
            });
            if (!res.ok) {
              console.error('Failed to POST row:', row);
            }
          } catch (error) {
            console.error('Error POSTing row:', error);
          }
        }

        // After all rows are posted, reload from the server
        fetchCustomers();
      },
      error: (err) => {
        console.error('Error parsing CSV:', err);
      },
    });
  };

  // 3) Searching locally
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCustomers = customers.filter((cust) =>
    cust.name?.toLowerCase().includes(search.toLowerCase()) ||
    cust.email?.toLowerCase().includes(search.toLowerCase())
  );

  // KPI Calculations
  const totalCustomers = customers.length;
  const totalSpentAll = customers.reduce((sum, c) => sum + (c.total_spent || 0), 0);
  const avgSpent = totalCustomers > 0
    ? (totalSpentAll / totalCustomers).toFixed(2)
    : 0;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Customers
      </Typography>

      {/* KPI Cards */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h5">{totalCustomers}</Typography>
            <Typography variant="body2">Total Customers</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h5">${totalSpentAll.toFixed(2)}</Typography>
            <Typography variant="body2">Total Spent</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h5">${avgSpent}</Typography>
            <Typography variant="body2">Avg. Spent</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Search & Import CSV */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <TextField
          label="Search Customers"
          variant="outlined"
          size="small"
          value={search}
          onChange={handleSearchChange}
          sx={{ width: 300 }}
        />
        <Box>
          <Button
            variant="outlined"
            sx={{ mr: 2 }}
            onClick={handleImportClick}
          >
            Import CSV
          </Button>
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
