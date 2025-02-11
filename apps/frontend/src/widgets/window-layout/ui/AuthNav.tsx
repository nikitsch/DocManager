import type { FC } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import adminImg from '~shared/assets/png/admin.png';
import userImg from '~shared/assets/png/user.png';
import { UserRole } from '~shared/model/enum';
import { useUserAuthStore } from '~entities/user-auth/model/useUserAuthStore';
import { useLogout } from '../model/useLogout';

const AuthNav: FC = () => {
  const { mutate: logout, isPending } = useLogout();
  const user = useUserAuthStore((state) => state.user);
  const { username = 'unknown', role } = user ?? {};

  return (
    <Stack direction="row" spacing={1} alignItems="center" height={52}>
      <Avatar
        alt="Auth"
        src={role === UserRole.ADMIN ? adminImg : userImg}
        variant="square"
        sx={{ width: 40, height: 40 }}
      />

      <Stack alignItems="center">
        <Typography variant="body2" color="textDisabled" fontWeight="bold">
          {username}
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
