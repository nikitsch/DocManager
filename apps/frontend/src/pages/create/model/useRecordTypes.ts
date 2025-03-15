import { useQuery } from '@tanstack/react-query';
import { IRecordTypeEntity } from '~shared/model/interface';
import { QueryOptionsType } from '~shared/model/type';
import { getRecordTypes } from '../api/getRecordTypes';

export function useRecordTypes(
  queryOptions: QueryOptionsType<IRecordTypeEntity[]>
) {
  return useQuery({
    ...queryOptions,
    queryKey: ['recordsTypes'],
    queryFn: () => getRecordTypes(),
  });
}
