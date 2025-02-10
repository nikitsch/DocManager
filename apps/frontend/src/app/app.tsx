import { FC } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import RouterProvider from './providers/RouterProvider';
import ThemeProvider from './providers/ThemeProvider';
import QueryClientProvider from './providers/QueryClientProvider';

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
