// client/src/Pages/Services.js
import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, CardActions, Button } from '@mui/material';
import InsightsIcon   from '@mui/icons-material/Insights';
import CampaignIcon   from '@mui/icons-material/Campaign';
import SyncAltIcon    from '@mui/icons-material/SyncAlt';

const offerings = [
  {
    icon: <InsightsIcon color="secondary" fontSize="large" />,
    title: 'E-commerce Analytics',
    desc: 'Real-time dashboards, cohort analysis and A/B testing insights for Shopify & WooCommerce.'
  },
  {
    icon: <CampaignIcon color="secondary" fontSize="large" />,
    title: 'Growth Marketing',
    desc: 'Done-for-you email, SMS and paid-social campaigns driven by your own first-party data.'
  },
  {
    icon: <SyncAltIcon color="secondary" fontSize="large" />,
    title: 'Data Integration',
    desc: 'Unified pipelines that pull data from GA4, Meta Ads, Stripe and more — no code required.'
  }
];

function Services() {
  return (
    <Box sx={{ py: 6, bgcolor: 'background.default' }}>
      <Container maxWidth="md">
        <Typography variant="h3" gutterBottom fontWeight={700}>
          Our&nbsp;Services
        </Typography>
        <Grid container spacing={4}>
          {offerings.map(({ icon, title, desc }) => (
            <Grid item xs={12} sm={4} key={title}>
              <Card elevation={3} sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  {icon}
                  <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                    {title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {desc}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                  <Button size="small" variant="outlined" color="primary">
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Services;
