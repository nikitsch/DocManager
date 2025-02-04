import type { FC } from 'react';
import Paper from '@mui/material/Paper';
import { Outlet } from 'react-router';

const AuthLayout: FC = () => (
  <Paper elevation={3}>
    <Outlet />
  </Paper>
);

export default AuthLayout;
