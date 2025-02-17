import CssBaseline from '@mui/material/CssBaseline';
import RouterProvider from './providers/RouterProvider';
import ThemeProvider from './providers/ThemeProvider';
import QueryClientProvider from './providers/QueryClientProvider';

import type { FC } from 'react';

const App: FC = () => {
  return (
    <ThemeProvider>
      <QueryClientProvider>
        <CssBaseline />
        <RouterProvider />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
