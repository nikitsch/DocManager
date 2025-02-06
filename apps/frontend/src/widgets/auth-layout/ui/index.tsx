import { Outlet } from 'react-router';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import type { FC } from 'react';

const AuthLayout: FC = () => (
  <Stack
    alignItems="center"
    justifyContent="center"
    sx={{ backgroundColor: '#bbd8f4', minHeight: '100vh' }}
  >
    <Paper elevation={3} sx={{ width: '35vw', maxWidth: '500px' }}>
      <Stack p={3} spacing={3}>
        <Outlet />
      </Stack>
    </Paper>
  </Stack>
);

export default AuthLayout;
