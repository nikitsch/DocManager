import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import { RoutesPaths } from '~shared/enum/Routes';

import type { FC } from 'react';
import AuthNav from './AuthNav';

const Navigation: FC = () => (
  <Stack
    position="sticky"
    direction="row"
    alignItems="center"
    justifyContent="space-between"
    top="0"
    width="100%"
    height="68px"
    padding="8px 40px"
    sx={{ backgroundColor: 'rgba(230, 230, 230, 0.92)' }}
  >
    <Link
      href={RoutesPaths.ARCHIVE}
      variant="h6"
      fontWeight="bold"
      underline="hover"
    >
      Document Archive
    </Link>

    <AuthNav />
  </Stack>
);

export default Navigation;
