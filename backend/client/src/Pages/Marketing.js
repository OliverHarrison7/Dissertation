import React, { useState, useRef } from 'react';
import Papa from 'papaparse';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material';

// Recharts imports
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

const Marketing = () => {
  const [marketingData, setMarketingData] = useState([]);
  const fileInputRef = useRef(null);

  // The user clicks "Import CSV" button
  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // When user selects a CSV
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setMarketingData(results.data);
      },
      error: (err) => {
        console.error('Error parsing marketing CSV:', err);
      },
    });
  };

  // --- Compute summary stats from marketingData ---
  // Example: sum of Sessions, sum of Orders, sum of Sales.
  // Adjust column names to match your CSV exactly (e.g. "Sessions", "Orders", "Sales").
  const totalSessions = marketingData.reduce((sum, row) => sum + Number(row.Sessions || 0), 0);
  const totalOrders = marketingData.reduce((sum, row) => sum + Number(row.Orders || 0), 0);
  const totalSales = marketingData.reduce((sum, row) => sum + Number(row.Sales || 0), 0).toFixed(2);

  // Example: Build data for a line chart grouped by Date
  // If your CSV has multiple rows per date, you might need to group them.
  // For simplicity, let's assume each date has one row per channel, so we just sum by date.
  const aggregatedByDate = {};
  marketingData.forEach((row) => {
    const date = row.Date;
    const sales = Number(row.Sales || 0);
    if (!aggregatedByDate[date]) {
      aggregatedByDate[date] = sales;
    } else {
      aggregatedByDate[date] += sales;
    }
  });
  // Convert aggregated object to an array suitable for Recharts
  const salesLineData = Object.keys(aggregatedByDate).map((date) => ({
    date,
    sales: aggregatedByDate[date]
  }));

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Marketing Data
      </Typography>

      <Button variant="contained" onClick={handleImportClick} sx={{ mb: 2 }}>
        Import Marketing CSV
      </Button>
      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />

      {marketingData.length === 0 ? (
        <Typography>No marketing data loaded.</Typography>
      ) : (
        <Box sx={{ mt: 3 }}>
          {/* TOP CARDS / KPI */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={4} md={4}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h6">Total Sessions</Typography>
                <Typography variant="h5">{totalSessions}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h6">Total Orders</Typography>
                <Typography variant="h5">{totalOrders}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h6">Total Sales</Typography>
                <Typography variant="h5">${totalSales}</Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* LINE CHART: Sales Over Time */}
          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Sales Over Time
            </Typography>
            {salesLineData.length === 0 ? (
              <Typography>No sales data found.</Typography>
            ) : (
              <Box sx={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                  <LineChart data={salesLineData}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            )}
          </Paper>

          {/* TABLE OF ALL ROWS */}
          <Paper>
            <TableContainer sx={{ maxHeight: 400 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {/* Adjust these columns to match your CSV */}
                    <TableCell>Date</TableCell>
                    <TableCell>Channel</TableCell>
                    <TableCell>Sessions</TableCell>
                    <TableCell>Orders</TableCell>
                    <TableCell>Sales</TableCell>
                    <TableCell>CTR</TableCell>
                    <TableCell>Cost</TableCell>
                    {/* etc. */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {marketingData.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell>{row.Date}</TableCell>
                      <TableCell>{row.Channel}</TableCell>
                      <TableCell>{row.Sessions}</TableCell>
                      <TableCell>{row.Orders}</TableCell>
                      <TableCell>{row.Sales}</TableCell>
                      <TableCell>{row.CTR}</TableCell>
                      <TableCell>{row.Cost}</TableCell>
                      {/* etc. */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      )}
    </Container>
  );
};

export default Marketing;
