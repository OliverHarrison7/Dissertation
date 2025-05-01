// client/src/Pages/Contact.js
import React, { useState } from 'react';
import {
  Box, Container, Typography, TextField, Button, Grid, Paper
} from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon       from '@mui/icons-material/Phone';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: send the form to your backend / email service
    alert('Message sent!');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <Box sx={{ py: 6, bgcolor: 'background.default' }}>
      <Container maxWidth="md">
        <Typography variant="h3" gutterBottom fontWeight={700}>
          Contact&nbsp;Us
        </Typography>

        <Grid container spacing={4}>
          {/* Contact form */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }} elevation={3}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Send us a message
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Name"
                  name="name"
                  fullWidth
                  required
                  sx={{ mb: 2 }}
                  value={form.name}
                  onChange={handleChange}
                />
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  fullWidth
                  required
                  sx={{ mb: 2 }}
                  value={form.email}
                  onChange={handleChange}
                />
                <TextField
                  label="Message"
                  name="message"
                  fullWidth
                  required
                  multiline
                  rows={4}
                  sx={{ mb: 2 }}
                  value={form.message}
                  onChange={handleChange}
                />
                <Button variant="contained" color="primary" type="submit">
                  Send
                </Button>
              </form>
            </Paper>
          </Grid>

          {/* Direct contact details */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }} elevation={3}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Reach us directly
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <MailOutlineIcon sx={{ mr: 1 }} color="secondary" />
                <Typography>support@datapilot.io</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PhoneIcon sx={{ mr: 1 }} color="secondary" />
                <Typography>+44 20 7946 0999</Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Contact;
