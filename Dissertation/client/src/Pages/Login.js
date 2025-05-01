import React, { useState } from 'react';
import axios from 'axios';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const navigate                = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // 1) Send email/password to backend
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password
      });

      // 2) Alert the success message
      alert(response.data.message); 
      // e.g. "Login successful!"

      // 3) Store the token in localStorage
      // The backend response must include { token: "<JWT>" }
      if (response.data.token) {
        localStorage.setItem('myToken', response.data.token);
      }

      // 4) Navigate to /dashboard or MyAccount
      navigate('/home');

    } catch (err) {
      console.error(err);
      // If the backend returns an error with a message, show it
      alert(err.response?.data?.message || 'Login error.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          p: 4,
          border: '1px solid #ccc',
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: '#fff'
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth 
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
