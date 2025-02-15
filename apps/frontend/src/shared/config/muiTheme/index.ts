import { createTheme } from '@mui/material/styles';
import { gridClasses } from '@mui/x-data-grid';

import type {} from '@mui/x-data-grid/themeAugmentation';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4A5577',
    },
    secondary: {
      main: '#F29047',
    },
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.main,

          '--DataGrid-containerBackground': '#DDECF4',

          [`& .${gridClasses.columnHeaderTitle}`]: {
            color: 'black',
            fontWeight: 'bold',
          },
          [`& .${gridClasses.row}`]: {
            cursor: 'pointer',
          },

          '& .MuiTablePagination-root': {
            color: theme.palette.primary.main,
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: '#EFF4FC',
            // border: `1px solid ${theme.palette.primary.main}`,
          },
          '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': {
            outline: 'none',
          },
          '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within':
            {
              outline: 'none',
            },
        }),
      },
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
