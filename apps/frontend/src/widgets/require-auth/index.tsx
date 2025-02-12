import type { FC } from 'react';
import { Navigate, Outlet } from 'react-router';
import { RoutesPaths } from '~shared/model/enum';
import { useRequireAuth } from './model/useRequireAuth';

const RequireAuth: FC = () => {
  const { isLoading, error } = useRequireAuth();

  if (isLoading) return null;

  return error ? <Navigate to={RoutesPaths.LOGIN} replace /> : <Outlet />;
};

export default RequireAuth;
