import type { FC } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const RegisterPage: FC = () => {
  return (
    <>
      <Stack alignItems="center">
        <Typography variant="h5">Registration</Typography>
      </Stack>
      <TextField id="username" label="Username" variant="outlined" />
      <TextField id="password" label="Password" variant="outlined" />
      <TextField
        id="organization_name"
        label="Organization Name"
        variant="outlined"
      />
    </>
  );
};

export default RegisterPage;
