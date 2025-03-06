import { useMemo } from 'react';
import { useRecordTypes } from './useRecordTypes';

export const useRecordTypeOptions = () => {
  const { data: recordTypes, ...rest } = useRecordTypes();

  const recordTypeOptions = useMemo(() => {
    return (recordTypes || []).map(({ id, type }) => ({
      value: id,
      label: type,
    }));
  }, [recordTypes]);

  return [recordTypeOptions, rest] as const;
};
