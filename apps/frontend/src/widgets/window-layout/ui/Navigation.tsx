import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { RoutesPaths } from '~shared/enum/Routes';

import type { FC } from 'react';

const Navigation: FC = () => (
  <Stack
    position='sticky'
    direction='row'
    alignItems="center"
    justifyContent="space-between"
    top='0'
    width="100%"
    height='50px'
    padding='8px 40px'
    sx={{ backgroundColor: 'rgba(230, 230, 230, 0.92)' }}
  >
    <Link href={RoutesPaths.ARCHIVE} variant="h6" fontWeight='bold' underline="hover" color='#4A5577'>Document Archive</Link>
    <Stack>
      <Typography variant='body2'>my-login</Typography>
      <Link href={RoutesPaths.LOGIN} variant="body2" fontWeight='bold' underline="hover" color='#F29047'>Logout</Link>
    </Stack>
  </Stack>
);

export default Navigation;
