// src/Pages/MyAccount.js
import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  TextField,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function MyAccount() {
  const navigate = useNavigate();

  const [loading, setLoading]   = useState(true);
  const [userData, setUserData] = useState({
    email: '',      // editable fields
    name:  '',
    phone: '',
    role:  '',
    newPassword: ''
  });

  /* ------------------------------------------------------------------ *
   * 1. On mount, load the current user
   * ------------------------------------------------------------------ */
  useEffect(() => {
    const token = localStorage.getItem('myToken');
    if (!token) {
      console.warn('No token: redirecting to /login');
      navigate('/login', { replace: true });
      return;
    }

    (async () => {
      try {
        const res = await fetch('http://localhost:5000/api/users/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error(`GET /api/users/me → ${res.status}`);
        const user = await res.json();
        setUserData({
          email: user.email ?? '',
          name:  user.name  ?? '',
          phone: user.phone ?? '',
          role:  user.role  ?? '',
          newPassword: ''
        });
      } catch (err) {
        console.error(err);
        alert('Could not load account details.');
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate]);

  /* ------------------------------------------------------------------ *
   * 2. Local form handling
   * ------------------------------------------------------------------ */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem('myToken');
    if (!token) return alert('Session expired – please log in again.');

    try {
      const res = await fetch('http://localhost:5000/api/users/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          email: userData.email,
          name:  userData.name,
          phone: userData.phone,
          role:  userData.role,
          newPassword: userData.newPassword
        })
      });
      if (!res.ok) throw new Error(`PUT /api/users/me → ${res.status}`);
      const updated = await res.json();
      alert('Account updated!');

      setUserData({
        email: updated.email ?? '',
        name:  updated.name  ?? '',
        phone: updated.phone ?? '',
        role:  updated.role  ?? '',
        newPassword: ''
      });
    } catch (err) {
      console.error(err);
      alert('Update failed.');
    }
  };

  /* ------------------------------------------------------------------ *
   * 3. Render
   * ------------------------------------------------------------------ */
  if (loading) return <div>Loading…</div>;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          My Account
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Email"  name="email"  value={userData.email}  onChange={handleChange} />
          <TextField label="Name"   name="name"   value={userData.name}   onChange={handleChange} />
          <TextField label="Phone"  name="phone"  value={userData.phone}  onChange={handleChange} />
          <TextField label="Role"   name="role"   value={userData.role}   onChange={handleChange} />
          <TextField
            label="New Password"
            name="newPassword"
            type="password"
            value={userData.newPassword}
            onChange={handleChange}
            helperText="Leave blank to keep current password"
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
