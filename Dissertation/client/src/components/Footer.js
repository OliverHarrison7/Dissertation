// client/src/components/Footer.js
import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Stack,
  Divider
} from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';

const Footer = () => (
  <Box
    component="footer"
    sx={{
      bgcolor: 'primary.main',
      color:  'common.white',
      mt: 'auto',
      width: '100%'
    }}
  >
    {/* subtle hair-line divider */}
    <Divider sx={{ opacity: 0.12 }} />

    <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 4 } }}>
      <Grid container spacing={2} alignItems="center">
        {/* brand & copyright */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" fontWeight={700} mb={0.5}>
            DataPilot
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.8 }}>
            © {new Date().getFullYear()}&nbsp;DataPilot · All rights reserved
          </Typography>
        </Grid>

        {/* static nav labels */}
        <Grid
          item xs={12} sm={4}
          sx={{
            display: 'flex',
            justifyContent: { xs: 'flex-start', sm: 'center' },
            mt: { xs: 2, sm: 0 }
          }}
        >
          <Stack direction="row" spacing={2}>
            {['Privacy Policy', 'Terms of Service', 'Contact'].map(label => (
              <Typography
                key={label}
                variant="body2"
                fontSize={14}
                sx={{ opacity: 0.8 }}
              >
                {label}
              </Typography>
            ))}
          </Stack>
        </Grid>

        {/* decorative social icons (non-clickable) */}
        <Grid
          item xs={12} sm={4}
          sx={{
            display: 'flex',
            justifyContent: { xs: 'flex-start', sm: 'flex-end' },
            mt: { xs: 2, sm: 0 }
          }}
        >
          <Stack direction="row" spacing={1}>
            {[Facebook, Twitter, Instagram].map(Icon => (
              <Box
                key={Icon.displayName}
                sx={{ color: 'rgba(255,255,255,0.8)', fontSize: 0 }}
              >
                <Icon fontSize="small" />
              </Box>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  </Box>
);

export default Footer;
