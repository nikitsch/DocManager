import { fetchWithHandling } from '~features/api/api/fetchWithHandling';
import { IRecordTable } from '~shared/model/interface';

export const getRecords = async (params: string) => {
  return fetchWithHandling<IRecordTable>(`/api/records?${params}`);
};
