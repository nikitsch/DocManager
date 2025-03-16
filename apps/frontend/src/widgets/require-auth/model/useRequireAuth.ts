import { useQuery } from '@tanstack/react-query';
import { useApiErrorHandler } from '~shared/api/useApiErrorHandler';
import { QueryOptionsType } from '~shared/model/type';
import { checkAuth } from '../api/checkAuth';

export function useRequireAuth(queryOptions: QueryOptionsType<boolean> = {}) {
  const query = useQuery({
    ...queryOptions,
    queryKey: ['checkAuth'],
    queryFn: checkAuth,
    retry: false,
  });

  useApiErrorHandler(query.error); //TODO: переделать

  return query;
}
