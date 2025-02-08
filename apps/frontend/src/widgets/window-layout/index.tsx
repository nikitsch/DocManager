import type { FC } from 'react';
import { Outlet } from 'react-router';
import Navigation from './ui/Navigation';
import Stack from '@mui/material/Stack';

const WindowLayout: FC = () => (
  <>
    <Navigation />
    <Stack margin="20px 40px">
      <Outlet />
    </Stack>
  </>
);

export default WindowLayout;
