/***********************************************
 * File: client/src/Pages/MyAccount.js
 ***********************************************/
import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  TextField,
  Button
} from '@mui/material';

function MyAccount() {
  const [loading, setLoading] = useState(true);

  // The user can edit these fields + optional new password
  const [userData, setUserData] = useState({
    email: '',
    name: '',
    phone: '',
    role: '',
    newPassword: ''
  });

  // On mount, fetch user from /api/users/me
  useEffect(() => {
    // 1) get token from localStorage (assuming you stored it after login)
    const token = localStorage.getItem('myToken');
    if (!token) {
      console.warn('No token found; user is not logged in');
      // Optionally navigate('/login')
      return;
    }

    // 2) fetch /api/users/me with Authorization header
    fetch('http://localhost:5000/api/users/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error(`GET /api/users/me failed`);
        return res.json();
      })
      .then((user) => {
        // user includes email, name, phone, role, createdAt
        setUserData({
          email: user.email || '',
          name: user.name || '',
          phone: user.phone || '',
          role: user.role || '',
          newPassword: ''
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading user:', err);
        setLoading(false);
      });
  }, []);

  // Update local form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  // Save changes -> PUT /api/users/me
  const handleSave = async () => {
    const token = localStorage.getItem('myToken');
    if (!token) {
      return alert('No token found, cannot update user');
    }

    try {
      const res = await fetch('http://localhost:5000/api/users/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          email: userData.email,
          name: userData.name,
          phone: userData.phone,
          role: userData.role,
          newPassword: userData.newPassword
        })
      });
      if (!res.ok) {
        throw new Error(`PUT /api/users/me failed with status ${res.status}`);
      }
      const updated = await res.json();
      alert('Account updated successfully!');
      // Update form, clearing newPassword
      setUserData({
        email: updated.email || '',
        name: updated.name || '',
        phone: updated.phone || '',
        role: updated.role || '',
        newPassword: ''
      });
    } catch (err) {
      console.error('Error updating user:', err);
      alert('Failed to update user');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          My Account
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
          <TextField
            label="Name"
            name="name"
            value={userData.name}
            onChange={handleChange}
          />
          <TextField
            label="Phone"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
          />
          <TextField
            label="Role"
            name="role"
            value={userData.role}
            onChange={handleChange}
          />
          <TextField
            label="New Password"
            name="newPassword"
            type="password"
            value={userData.newPassword}
            onChange={handleChange}
            helperText="Leave blank if you don't want to change password"
          />
          <Box sx={{ textAlign: 'right' }}>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default MyAccount;
