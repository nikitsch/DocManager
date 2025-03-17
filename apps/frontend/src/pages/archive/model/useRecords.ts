import { useQueryHandler } from '~features/api/model/useQueryHandler';
import { IRecordTable } from '~shared/model/interface';
import { QueryOptionsType } from '~shared/model/type';
import { useQueryParams } from './useQueryParams';
import { getRecords } from '../api/getRecords';

type TData = IRecordTable;

export function useRecords(queryOptions: QueryOptionsType<TData> = {}) {
  const { queryKeys, queryString } = useQueryParams();

  return useQueryHandler<TData>({
    ...queryOptions,
    queryKey: ['records', ...queryKeys],
    queryFn: () => getRecords(queryString),
    placeholderData: (previousData) => previousData, //TODO: How did it help?
  });
}
