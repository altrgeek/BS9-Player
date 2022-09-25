import { createTheme } from '@mui/material';

const theme = createTheme({
   palette: {
      primary: {
         main: 'rgb(6, 33, 52)',
      },
   },
   breakpoints: {
      values: {
         xs: 0,
         sm: 600,
         md: 1000,
         lg: 1280,
         xl: 1920,
      },
   },
});

export default theme;
