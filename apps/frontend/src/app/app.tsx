import CssBaseline from '@mui/material/CssBaseline';
import LocalizationProvider from './providers/LocalizationProvider';
import QueryClientProvider from './providers/QueryClientProvider';
import RouterProvider from './providers/RouterProvider';
import ThemeProvider from './providers/ThemeProvider';

import type { FC } from 'react';

const App: FC = () => {
  return (
    <ThemeProvider>
      <QueryClientProvider>
        <LocalizationProvider>
          <CssBaseline />
          <RouterProvider />
        </LocalizationProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
