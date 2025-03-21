import { fetchWithHandling } from '~features/api/api/fetchWithHandling';

export const checkAuth = async () => {
  return fetchWithHandling<boolean>('api/auth/check');
};
