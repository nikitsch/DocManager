import { useQueryHandler } from '~features/api/model/useQueryHandler';
import { useIsAdmin } from '~shared/model/helper/useIsAdmin';
import { IUser } from '~shared/model/interface';
import { QueryOptionsType } from '~shared/model/type';
import { getUsers } from '../api/getUsers';

type TData = IUser[];

export function useUsers(queryOptions: QueryOptionsType<TData> = {}) {
  const isAdmin = useIsAdmin();

  return useQueryHandler<TData>({
    ...queryOptions,
    queryKey: ['users'],
    queryFn: () => getUsers(),
    enabled: isAdmin,
  });
}
