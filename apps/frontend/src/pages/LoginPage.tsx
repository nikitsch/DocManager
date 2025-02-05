import type { FC } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const LoginPage: FC = () => {
  return (
    <>
      <Stack alignItems="center">
        <Typography variant="h5">Authentication</Typography>
      </Stack>
      <TextField id="username" label="Username" variant="outlined" />
      <TextField
        type="password"
        id="password"
        label="Password"
        variant="outlined"
      />
    </>
  );
};

export default LoginPage;
