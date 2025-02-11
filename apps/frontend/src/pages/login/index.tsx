import type { FC } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';
import { RoutesPaths } from '~shared/model/enum';
import LoginPageForm from './ui/LoginPageForm';

const LoginPage: FC = () => {
  return (
    <>
      <Stack alignItems="center">
        <Typography variant="h5">Authentication</Typography>
      </Stack>
      <LoginPageForm />
      <Stack alignItems="flex-end">
        <Typography>
          Have you not joined yet?{' '}
          <Link href={RoutesPaths.REGISTER}>Register</Link>
        </Typography>
      </Stack>
    </>
  );
};

export default LoginPage;
