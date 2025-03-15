import { fetchWithHandling } from '~shared/api/fetchWithHandling';
import { IUser } from '~shared/model/interface';

export const getUsers = async () => {
  return fetchWithHandling<IUser[]>('/api/users');
};
