import type { FC } from 'react';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

const SkeletonRegisterPage: FC = () => {
  return (
    <Stack spacing={1}>
      <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
      <Skeleton variant="rounded" width="100%" height={240} />
    </Stack>
  );
};

export default SkeletonRegisterPage;
