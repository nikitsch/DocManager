import { fetchWithHandling } from '~features/api/api/fetchWithHandling';
import { IRecordTypeEntity } from '~shared/model/interface';

export const getRecordTypes = async () => {
  return fetchWithHandling<IRecordTypeEntity[]>('/api/records/types');
};
