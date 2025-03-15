import { useQuery } from '@tanstack/react-query';
import { useIsAdmin } from '~shared/model/helper/useIsAdmin';
import { IUser } from '~shared/model/interface';
import { QueryOptionsType } from '~shared/model/type';
import { getUsers } from '../api/getUsers';

export function useUsers(queryOptions: QueryOptionsType<IUser[]> = {}) {
  const isAdmin = useIsAdmin();

  return useQuery({
    ...queryOptions,
    queryKey: ['users'],
    queryFn: () => getUsers(),
    enabled: isAdmin,
  });
}
