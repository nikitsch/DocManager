import type { FC } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';
import { RoutesPaths } from '~shared/model/enum';
import RegisterPageForm from './ui/RegisterPageForm';

const RegisterPage: FC = () => {
  return (
    <>
      <Stack alignItems="center">
        <Typography variant="h5">Registration</Typography>
      </Stack>
      <RegisterPageForm />
      <Stack alignItems="flex-end">
        <Typography>
          Return to <Link href={RoutesPaths.LOGIN}>Login</Link>
        </Typography>
      </Stack>
    </>
  );
};

export default RegisterPage;
