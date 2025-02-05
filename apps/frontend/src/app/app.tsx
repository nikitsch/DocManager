import { FC } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import RouterProvider from './providers/RouterProvider';

const App: FC = () => {
  return (
    <>
      <CssBaseline />
      <RouterProvider />
    </>
  );
};

export default App;
