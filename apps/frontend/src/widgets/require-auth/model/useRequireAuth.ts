import { useQueryHandler } from '~features/api/model/useQueryHandler';
import { QueryOptionsType } from '~shared/model/type';
import { checkAuth } from '../api/checkAuth';

type TData = boolean;

export function useRequireAuth(queryOptions: QueryOptionsType<TData> = {}) {
  return useQueryHandler<TData>({
    ...queryOptions,
    queryKey: ['checkAuth'],
    queryFn: checkAuth,
    retry: false,
  });
}
