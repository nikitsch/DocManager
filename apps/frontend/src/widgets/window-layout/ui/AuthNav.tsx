import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import adminImg from '~shared/assets/png/admin.png';
// import userImg from '~shared/assets/png/user.png';

import type { FC } from 'react';
import { Button } from '@mui/material';
import { useLogout } from '../model/useLogout';

const AuthNav: FC = () => {
  // const avatar =  ? adminImg : userImg
  const { mutate: logout, isPending } = useLogout();

  return (
    <Stack direction="row" spacing={1} alignItems="center" height={52}>
      <Avatar
        alt="Auth"
        src={adminImg}
        variant="square"
        sx={{ width: 40, height: 40 }}
      />

      <Stack>
        <Typography variant="body2" color="textDisabled">
          @my-login
        </Typography>

        <Button
          size="small"
          loading={isPending}
          onClick={() => logout()}
          sx={{ color: (theme) => theme.palette.secondary.main }}
        >
          Logout
        </Button>
      </Stack>
    </Stack>
  );
};

export default AuthNav;
