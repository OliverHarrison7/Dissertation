// client/src/Pages/Pricing.js
import React from 'react';
import { Box, Container, Typography, Grid, Paper, Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckIcon from '@mui/icons-material/CheckCircle';

const tiers = [
  {
    name: 'Starter',
    price: 'Free',
    features: ['Up to 500 orders / mo', 'Dashboards & CSV export', 'Email support'],
    cta: 'Sign Up'
  },
  {
    name: 'Growth',
    price: '$49 / mo',
    features: ['Up to 5 k orders / mo', 'Automated insights', 'A/B testing tools', 'Priority email support'],
    cta: 'Start Trial',
    highlight: true
  },
  {
    name: 'Scale',
    price: '$199 / mo',
    features: ['Unlimited orders', 'Advanced segmentation', 'Dedicated CSM', 'Slack support'],
    cta: 'Contact Sales'
  }
];

function Pricing() {
  return (
    <Box sx={{ py: 6, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" gutterBottom fontWeight={700} textAlign="center">
          Pricing&nbsp;Plans
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {tiers.map(({ name, price, features, cta, highlight }) => (
            <Grid item xs={12} sm={6} md={4} key={name}>
              <Paper
                elevation={highlight ? 6 : 2}
                sx={{
                  p: 4,
                  border: highlight ? 2 : 1,
                  borderColor: highlight ? 'secondary.main' : 'divider'
                }}
              >
                <Typography variant="h5" fontWeight={600}>{name}</Typography>
                <Typography variant="h4" sx={{ my: 2 }}>{price}</Typography>

                <List dense>
                  {features.map(f => (
                    <ListItem key={f}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckIcon color="secondary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={f} />
                    </ListItem>
                  ))}
                </List>

                <Button
                  fullWidth
                  variant={highlight ? 'contained' : 'outlined'}
                  color={highlight ? 'secondary' : 'primary'}
                  sx={{ mt: 2 }}
                >
                  {cta}
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Pricing;
