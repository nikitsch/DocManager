import { fetchWithHandling } from '~features/api/api/fetchWithHandling';
import { IUser } from '~shared/model/interface';

export const getUsers = async () => {
  return fetchWithHandling<IUser[]>('/api/users');
};
