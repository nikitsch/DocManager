import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { RoutesPaths } from '~shared/enum/Routes';
import adminImg from '~shared/assets/png/admin.png';
// import userImg from '~shared/assets/png/user.png';

import type { FC } from 'react';

const AuthNav: FC = () => {
  // const avatar =  ? adminImg : userImg

  return (
    <Stack direction="row" spacing={1} alignItems="center" height={40}>
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

        <Link
          href={RoutesPaths.LOGIN}
          variant="body2"
          fontWeight="bold"
          underline="hover"
          sx={{ color: (theme) => theme.palette.secondary.main }}
        >
          Logout
        </Link>
      </Stack>
    </Stack>
  );
};

export default AuthNav;
