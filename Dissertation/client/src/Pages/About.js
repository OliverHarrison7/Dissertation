// client/src/Pages/About.js
import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import TrendingUpIcon   from '@mui/icons-material/TrendingUp';
import SecurityIcon     from '@mui/icons-material/Security';

const values = [
  { icon: <EmojiObjectsIcon fontSize="large" color="secondary" />, title: 'Innovation', desc: 'We build cutting-edge analytics tools that turn data into growth.' },
  { icon: <TrendingUpIcon   fontSize="large" color="secondary" />, title: 'Impact',     desc: 'Every feature is designed to deliver measurable ROI for merchants.' },
  { icon: <SecurityIcon     fontSize="large" color="secondary" />, title: 'Trust',      desc: 'Your data is encrypted, protected and never shared without consent.' }
];

function About() {
  return (
    <Box sx={{ py: 6, bgcolor: 'background.default' }}>
      <Container maxWidth="md">
        <Typography variant="h3" gutterBottom fontWeight={700}>
          About&nbsp;DataPilot
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Founded in 2024, DataPilot helps 800+ e-commerce brands unlock hidden insights,
          boost conversion rates and increase lifetime value.
        </Typography>

        <Grid container spacing={3}>
          {values.map(({ icon, title, desc }) => (
            <Grid item xs={12} sm={4} key={title}>
              <Paper sx={{ p: 3, textAlign: 'center' }} elevation={2}>
                {icon}
                <Typography variant="h6" sx={{ mt: 1, mb: 1 }}>
                  {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default About;
