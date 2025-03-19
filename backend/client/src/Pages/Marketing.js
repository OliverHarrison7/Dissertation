// client/src/Pages/Marketing.js
import React, { useState, useRef } from 'react';
import Papa from 'papaparse';
import {
  Box,
  Container,
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button
} from '@mui/material';

const Marketing = () => {
  const [marketingData, setMarketingData] = useState([]);
  const fileInputRef = useRef(null);

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
      complete: (results) => {
        // results.data is an array of objects (one per row)
        setMarketingData(results.data);
      },
      error: (err) => {
        console.error('Error parsing marketing CSV:', err);
      },
    });
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Marketing Data
      </Typography>
      
      {/* Import CSV button */}
      <Box sx={{ mb: 2 }}>
        <Button variant="outlined" color="secondary" onClick={handleImportClick}>
          Import Marketing CSV
        </Button>
        <input
          type="file"
          accept=".csv"
          ref={fileInputRef}
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />
      </Box>

      {marketingData.length === 0 ? (
        <Typography>No marketing data loaded. Please import CSV.</Typography>
      ) : (
        <Paper>
          <TableContainer sx={{ maxHeight: 500 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {/* Adjust to match your CSV headers exactly */}
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
                {marketingData.map((row, idx) => (
                  <TableRow key={idx}>
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
      )}
    </Container>
  );
};

export default Marketing;
