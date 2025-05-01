// client/src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary:   { main: '#0f1115' },  // dark/navy bar + sidebar
    secondary: { main: '#1e88e5' },  // accent blue (buttons/links)
    background: {
      default: '#f5f6f8',            // **light page background**
      paper:   '#ffffff'
    }
  },
  typography: {
    fontFamily: `'Inter','Roboto',sans-serif`,
    h2: { fontWeight: 700 }
  }
});

export default theme;
