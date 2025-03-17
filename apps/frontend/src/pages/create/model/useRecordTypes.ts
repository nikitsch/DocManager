import { useQueryHandler } from '~features/api/model/useQueryHandler';
import { IRecordTypeEntity } from '~shared/model/interface';
import { QueryOptionsType } from '~shared/model/type';
import { getRecordTypes } from '../api/getRecordTypes';

type TData = IRecordTypeEntity[];

export function useRecordTypes(queryOptions: QueryOptionsType<TData>) {
  return useQueryHandler<TData>({
    ...queryOptions,
    queryKey: ['recordsTypes'],
    queryFn: () => getRecordTypes(),
  });
}
