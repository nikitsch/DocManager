import type { FC } from 'react';
import Paper from '@mui/material/Paper';
import { Outlet } from 'react-router';
import Stack from '@mui/material/Stack';

const AuthLayout: FC = () => (
  <Stack
    alignItems="center"
    justifyContent="center"
    height="100vh"
    sx={{ backgroundColor: '#bbd8f4' }}
  >
    <Paper elevation={3} sx={{ width: '35vw' }}>
      <Stack p={3} spacing={2}>
        <Outlet />
      </Stack>
    </Paper>
  </Stack>
);

export default AuthLayout;
