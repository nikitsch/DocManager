import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { RoutesPaths } from '~shared/model/enum';
import { useQueryParams } from './useQueryParams';
import { getRecords } from '../api/getRecords';

export function useRecords() {
  const navigate = useNavigate();
  const { queryKeys, queryString } = useQueryParams();

  const query = useQuery({
    queryKey: ['records', ...queryKeys],
    queryFn: () => getRecords(queryString),
    placeholderData: (previousData) => previousData, //TODO: How did it help?
  });

  useEffect(() => {
    const error = query.error as { statusCode?: number; message: string };
    if (error?.statusCode === 401) {
      navigate(`/${RoutesPaths.LOGIN}`, { replace: true });
    }
    //TODO: Snackbar
  }, [navigate, query.error]);

  return query;
}
