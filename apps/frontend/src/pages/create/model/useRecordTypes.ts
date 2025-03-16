import { useQuery } from '@tanstack/react-query';
import { IRecordTypeEntity } from '~shared/model/interface';
import { QueryOptionsType } from '~shared/model/type';
import { getRecordTypes } from '../api/getRecordTypes';
import { useApiErrorHandler } from '~shared/api/useApiErrorHandler';

export function useRecordTypes(
  queryOptions: QueryOptionsType<IRecordTypeEntity[]>
) {
  const query = useQuery({
    ...queryOptions,
    queryKey: ['recordsTypes'],
    queryFn: () => getRecordTypes(),
  });

  useApiErrorHandler(query.error); //TODO: переделать

  return query;
}
