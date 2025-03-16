import { useQuery } from '@tanstack/react-query';
import { useApiErrorHandler } from '~shared/api/useApiErrorHandler';
import { IRecordTable } from '~shared/model/interface';
import { QueryOptionsType } from '~shared/model/type';
import { useQueryParams } from './useQueryParams';
import { getRecords } from '../api/getRecords';

export function useRecords(queryOptions: QueryOptionsType<IRecordTable> = {}) {
  const { queryKeys, queryString } = useQueryParams();

  const query = useQuery({
    ...queryOptions,
    queryKey: ['records', ...queryKeys],
    queryFn: () => getRecords(queryString),
    placeholderData: (previousData) => previousData, //TODO: How did it help?
  });

  useApiErrorHandler(query.error); //TODO: переделать

  return query;
}
