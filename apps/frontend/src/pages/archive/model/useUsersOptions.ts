import { useMemo } from 'react';
import { IUser } from '~shared/model/interface';
import { QueryOptionsType } from '~shared/model/type';
import { useUsers } from './useUsers';

export const useUsersOptions = (
  queryOptions: QueryOptionsType<IUser[]> = {}
) => {
  const { data: users, ...rest } = useUsers(queryOptions);

  const usersOptions = useMemo(() => {
    return (users || []).map(({ user_id, organization_name }) => ({
      value: user_id,
      label: organization_name,
    }));
  }, [users]);

  return [usersOptions, rest] as const;
};
