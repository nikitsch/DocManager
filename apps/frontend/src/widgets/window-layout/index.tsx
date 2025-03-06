import Stack from '@mui/material/Stack';
import { Outlet } from 'react-router';
import Navigation from './ui/Navigation';

import type { FC } from 'react';

const WindowLayout: FC = () => (
  <>
    <Navigation />
    <Stack margin="20px 40px">
      <Outlet />
    </Stack>
  </>
);

export default WindowLayout;
