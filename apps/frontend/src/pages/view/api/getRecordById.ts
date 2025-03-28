import { fetchWithHandling } from '~features/api/api/fetchWithHandling';
import { IRecord } from '~shared/model/interface';

export const getRecordById = async (record_id: string) => {
  return fetchWithHandling<IRecord>(`/api/records/${record_id}`);
};
