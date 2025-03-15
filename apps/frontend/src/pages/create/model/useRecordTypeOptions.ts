import { useMemo } from 'react';
import { QueryOptionsType } from '~shared/model/type';
import { IRecordTypeEntity } from '~shared/model/interface';
import { useRecordTypes } from './useRecordTypes';

export const useRecordTypeOptions = (
  queryOptions: QueryOptionsType<IRecordTypeEntity[]> = {}
) => {
  const { data: recordTypes, ...rest } = useRecordTypes(queryOptions);

  const recordTypeOptions = useMemo(() => {
    return (recordTypes || []).map(({ id, type }) => ({
      value: id,
      label: type,
    }));
  }, [recordTypes]);

  return [recordTypeOptions, rest] as const;
};
