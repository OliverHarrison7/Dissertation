import React from 'react';
import { Box, Container, Typography, Link, Grid, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#2C3E50', color: '#fff', py: 4, mt: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              DataPilot
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              © {new Date().getFullYear()} DataPilot. All rights reserved.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
              <IconButton color="inherit" component={Link} href="https://facebook.com" target="_blank">
                <Facebook />
              </IconButton>
              <IconButton color="inherit" component={Link} href="https://twitter.com" target="_blank">
                <Twitter />
              </IconButton>
              <IconButton color="inherit" component={Link} href="https://instagram.com" target="_blank">
                <Instagram />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Link href="/privacy" color="inherit" underline="hover" sx={{ mx: 1 }}>
            Privacy Policy
          </Link>
          <Link href="/terms" color="inherit" underline="hover" sx={{ mx: 1 }}>
            Terms of Service
          </Link>
          <Link href="/contact" color="inherit" underline="hover" sx={{ mx: 1 }}>
            Contact
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
