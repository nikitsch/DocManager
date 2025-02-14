import { useQuery } from '@tanstack/react-query';
import { getRecords } from '../api/getRecords';
import { useQueryParams } from './useQueryParams';

export function useRecords() {
  const { queryKeys, queryString } = useQueryParams();

  return useQuery({
    queryKey: ['records', ...queryKeys],
    queryFn: () => getRecords(queryString),
    placeholderData: (previousData) => previousData, //TODO: How did it help?
  });
}
