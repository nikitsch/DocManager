import { useQuery } from '@tanstack/react-query';
import { useApiErrorHandler } from '~shared/api/useApiErrorHandler';
import { useIsAdmin } from '~shared/model/helper/useIsAdmin';
import { IUser } from '~shared/model/interface';
import { QueryOptionsType } from '~shared/model/type';
import { getUsers } from '../api/getUsers';

export function useUsers(queryOptions: QueryOptionsType<IUser[]> = {}) {
  const isAdmin = useIsAdmin();

  const query = useQuery({
    ...queryOptions,
    queryKey: ['users'],
    queryFn: () => getUsers(),
    enabled: isAdmin,
  });

  useApiErrorHandler(query.error); //TODO: переделать

  return query;
}
