import { Outlet } from 'react-router';
import { useRequireAuth } from './model/useRequireAuth';

import type { FC } from 'react';

const RequireAuth: FC = () => {
  const { isError, isLoading, isFetching } = useRequireAuth();

  if (isLoading || isFetching) return null;
  if (isError) return null;

  return <Outlet />;
};

export default RequireAuth;
