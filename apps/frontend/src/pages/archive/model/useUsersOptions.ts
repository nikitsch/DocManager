import { useMemo } from 'react';
import { useUsers } from './useUsers';

export const useUsersOptions = () => {
  const { data: users, ...rest } = useUsers();

  const usersOptions = useMemo(() => {
    return (users || []).map(({ user_id, organization_name }) => ({
      value: user_id,
      label: organization_name,
    }));
  }, [users]);

  return [usersOptions, rest] as const;
};
