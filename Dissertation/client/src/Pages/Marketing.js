// client/src/Pages/Marketing.js
import React, { useState, useRef, useEffect } from 'react';
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

  // Load marketing data from backend when component mounts
  useEffect(() => {
    const token = localStorage.getItem('myToken');
    if (token) {
      fetch('http://localhost:5000/api/marketing', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch marketing data');
          return res.json();
        })
        .then((data) => setMarketingData(data))
        .catch((err) => console.error('Error fetching marketing data:', err));
    }
  }, []);

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const data = results.data;
        setMarketingData(data);
        // Save imported data to backend
        const token = localStorage.getItem('myToken');
        if (token) {
          try {
            const res = await fetch('http://localhost:5000/api/marketing', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              },
              body: JSON.stringify(data)
            });
            if (!res.ok) {
              throw new Error('Failed to save marketing data');
            }
            alert('Marketing data saved successfully!');
          } catch (error) {
            console.error('Error saving marketing data:', error);
            alert('Error saving marketing data.');
          }
        } else {
          alert('No token found; please log in.');
        }
      },
      error: (err) => {
        console.error('Error parsing marketing CSV:', err);
      }
    });
  };

  // Compute KPIs from marketingData
  const totalSessions = marketingData.reduce((sum, row) => sum + Number(row.Sessions || 0), 0);
  const totalOrders = marketingData.reduce((sum, row) => sum + Number(row.Orders || 0), 0);
  const totalSales = marketingData.reduce((sum, row) => sum + Number(row.Sales || 0), 0).toFixed(2);

  // Aggregate sales by date for the line chart
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
          {/* KPI Cards */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h6">Total Sessions</Typography>
                <Typography variant="h5">{totalSessions}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h6">Total Orders</Typography>
                <Typography variant="h5">{totalOrders}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h6">Total Sales</Typography>
                <Typography variant="h5">${totalSales}</Typography>
              </Paper>
            </Grid>
          </Grid>
          {/* Line Chart: Sales Over Time */}
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
          {/* Table of Marketing Data */}
          <Paper>
            <TableContainer sx={{ maxHeight: 400 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Channel</TableCell>
                    <TableCell>Sessions</TableCell>
                    <TableCell>Orders</TableCell>
                    <TableCell>Sales</TableCell>
                    <TableCell>CTR</TableCell>
                    <TableCell>Cost</TableCell>
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
