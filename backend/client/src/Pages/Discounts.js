import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Discounts = () => {
  // Tab for "All, Active, Scheduled, Expired"
  const [tabValue, setTabValue] = useState(0);

  // Search text
  const [search, setSearch] = useState('');

  // Whether the add/edit dialog is open
  const [dialogOpen, setDialogOpen] = useState(false);

  // If we are editing an existing discount vs. adding new
  const [editingIndex, setEditingIndex] = useState(null);

  // Data for the discount being added/edited
  const [currentDiscount, setCurrentDiscount] = useState({
    code: '',
    type: '',
    value: '',
    usage: '',
    start: '',
    end: '',
    status: 'Active', // or "Scheduled", "Expired"
    description: ''
  });

  // Example discount data (in real app, might fetch from CSV or API)
  const [discounts, setDiscounts] = useState([
    {
      code: 'GDFHD',
      description: '$10.00 off entire order • Min purchase $100.00',
      status: 'Active',
      value: '10',
      type: 'Amount',
      usage: '0/2',
      start: 'Jul 30',
      end: '—'
    },
    {
      code: 'SUMMER20',
      description: '20% off entire store',
      status: 'Active',
      value: '20',
      type: 'Percent',
      usage: '5/∞',
      start: 'Jun 1',
      end: 'Aug 31'
    },
    {
      code: 'SCHD25',
      description: '25% off scheduled discount',
      status: 'Scheduled',
      value: '25',
      type: 'Percent',
      usage: '0/∞',
      start: 'Sep 1',
      end: 'Sep 30'
    },
    {
      code: 'FREESHIP',
      description: 'Free shipping on orders over $50',
      status: 'Expired',
      value: '100',
      type: 'Shipping',
      usage: '25/25',
      start: 'May 1',
      end: 'Jul 1'
    }
  ]);

  // Switch tab -> filter by status
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Filter the discounts by tab
  const filterByTab = (discount) => {
    switch (tabValue) {
      case 1: // Active
        return discount.status === 'Active';
      case 2: // Scheduled
        return discount.status === 'Scheduled';
      case 3: // Expired
        return discount.status === 'Expired';
      default: // All
        return true;
    }
  };

  // Filter by search
  const filteredDiscounts = discounts
    .filter(filterByTab)
    .filter(d =>
      d.code.toLowerCase().includes(search.toLowerCase()) ||
      (d.description && d.description.toLowerCase().includes(search.toLowerCase()))
    );

  // Open the dialog to add a new discount
  const handleCreateDiscount = () => {
    setEditingIndex(null); // new discount
    setCurrentDiscount({
      code: '',
      type: '',
      value: '',
      usage: '',
      start: '',
      end: '',
      status: 'Active',
      description: ''
    });
    setDialogOpen(true);
  };

  // Open the dialog to edit an existing discount
  const handleEdit = (index) => {
    setEditingIndex(index);
    setCurrentDiscount(discounts[index]); // load data
    setDialogOpen(true);
  };

  // Delete a discount
  const handleDelete = (index) => {
    const newArr = [...discounts];
    newArr.splice(index, 1);
    setDiscounts(newArr);
  };

  // Handle changes in the add/edit form fields
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setCurrentDiscount(prev => ({ ...prev, [name]: value }));
  };

  // Save the discount (add or update)
  const handleSaveDiscount = () => {
    let newArr = [...discounts];
    if (editingIndex === null) {
      // Add new discount
      newArr.push({ ...currentDiscount });
    } else {
      // Update existing
      newArr[editingIndex] = { ...currentDiscount };
    }
    setDiscounts(newArr);
    setDialogOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      {/* Top Bar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">Discounts</Typography>
        <Button variant="contained" color="primary" onClick={handleCreateDiscount}>
          Create discount
        </Button>
      </Box>

      {/* Tabs for All / Active / Scheduled / Expired */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="All" />
          <Tab label="Active" />
          <Tab label="Scheduled" />
          <Tab label="Expired" />
        </Tabs>
      </Box>

      {/* Filter + Search row */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Button variant="outlined" startIcon={<FilterListIcon />}>
          Filter
        </Button>
        <TextField
          size="small"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      {/* Table of Discounts */}
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Code</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Used</TableCell>
              <TableCell>Start</TableCell>
              <TableCell>End</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDiscounts.map((disc, index) => (
              <TableRow key={index}>
                <TableCell>
                  <input type="checkbox" />
                </TableCell>
                <TableCell>
                  <Box sx={{ fontWeight: 'bold' }}>{disc.code}</Box>
                  <Box sx={{ color: 'text.secondary', fontSize: 14 }}>
                    {disc.description}
                  </Box>
                </TableCell>
                <TableCell>{disc.status}</TableCell>
                <TableCell>{disc.usage || '0/∞'}</TableCell>
                <TableCell>{disc.start}</TableCell>
                <TableCell>{disc.end}</TableCell>
                <TableCell>
                  <Button
                    variant="text"
                    startIcon={<EditIcon />}
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="text"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filteredDiscounts.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} sx={{ textAlign: 'center', py: 3 }}>
                  No discounts found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>

      {/* Add/Edit Discount Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>
          {editingIndex === null ? 'Create Discount' : 'Edit Discount'}
        </DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="Code"
            name="code"
            value={currentDiscount.code}
            onChange={handleFieldChange}
          />
          <TextField
            label="Type"
            name="type"
            value={currentDiscount.type}
            onChange={handleFieldChange}
          />
          <TextField
            label="Value"
            name="value"
            value={currentDiscount.value}
            onChange={handleFieldChange}
          />
          <TextField
            label="Usage"
            name="usage"
            value={currentDiscount.usage}
            onChange={handleFieldChange}
          />
          <TextField
            label="Start"
            name="start"
            value={currentDiscount.start}
            onChange={handleFieldChange}
          />
          <TextField
            label="End"
            name="end"
            value={currentDiscount.end}
            onChange={handleFieldChange}
          />
          <TextField
            label="Status"
            name="status"
            value={currentDiscount.status}
            onChange={handleFieldChange}
          />
          <TextField
            label="Description"
            name="description"
            value={currentDiscount.description}
            onChange={handleFieldChange}
            multiline
            rows={2}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveDiscount}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Discounts;
