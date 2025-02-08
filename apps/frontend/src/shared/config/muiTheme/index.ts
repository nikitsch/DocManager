import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4A5577',
    },
    secondary: {
      main: '#F29047',
    },
  },
  // typography: {
  //   fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  //   h1: {
  //     fontSize: '2rem',
  //     fontWeight: 700,
  //   },
  // },
  // spacing: 8, // базовый отступ (используется как theme.spacing(1) = 8px)
});

export default theme;
