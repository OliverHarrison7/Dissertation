// File: Settings.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Container, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  FormControlLabel, 
  Checkbox 
} from '@mui/material';

const Settings = () => {
  const [settings, setSettings] = useState({
    storeName: '',
    storeEmail: '',
    currency: 'USD',
    taxRate: 0,
    shippingCost: 0,
    freeShipping: false
  });
  const [loading, setLoading] = useState(true);

  // Fetch settings on mount
  useEffect(() => {
    const token = localStorage.getItem('myToken');
    if (!token) {
      alert('Not logged in');
      setLoading(false);
      return;
    }
    axios.get('http://localhost:5000/api/settings', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setSettings(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching store settings:', err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    const token = localStorage.getItem('myToken');
    if (!token) {
      alert('Not logged in');
      return;
    }
    axios.put('http://localhost:5000/api/settings', settings, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        alert('Settings updated successfully!');
        setSettings(res.data);
      })
      .catch(err => {
        console.error('Error updating store settings:', err);
        alert('Error updating store settings.');
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Store Settings
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Store Name"
            name="storeName"
            value={settings.storeName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Store Email"
            name="storeEmail"
            value={settings.storeEmail}
            onChange={handleChange}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Currency</InputLabel>
            <Select
              name="currency"
              value={settings.currency}
              label="Currency"
              onChange={handleChange}
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="EUR">EUR</MenuItem>
              <MenuItem value="GBP">GBP</MenuItem>
              {/* Add other currencies as needed */}
            </Select>
          </FormControl>
          <TextField
            label="Tax Rate (%)"
            name="taxRate"
            type="number"
            value={settings.taxRate}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Default Shipping Cost ($)"
            name="shippingCost"
            type="number"
            value={settings.shippingCost}
            onChange={handleChange}
            fullWidth
          />
          <FormControlLabel
            control={
              <Checkbox
                name="freeShipping"
                checked={settings.freeShipping}
                onChange={handleChange}
              />
            }
            label="Enable Free Shipping"
          />
          <Box sx={{ textAlign: 'right', mt: 2 }}>
            <Button variant="contained" onClick={handleSave}>
              Save Settings
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Settings;
