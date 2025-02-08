import { FC } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import RouterProvider from './providers/RouterProvider';
import ThemeProvider from './providers/ThemeProvider';

const App: FC = () => {
  return (
    <ThemeProvider>
      <CssBaseline />
      <RouterProvider />
    </ThemeProvider>
  );
};

export default App;
