import { useQuery } from '@tanstack/react-query';
import { getRecordTypes } from '../api/getRecordTypes';

export function useRecordTypes() {
  return useQuery({
    queryKey: ['recordsTypes'],
    queryFn: () => getRecordTypes(),
  });
}
