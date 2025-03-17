import { fetchWithHandling } from '~shared/api/fetchWithHandling';

export const checkAuth = async () => {
  return fetchWithHandling<boolean>('api/auth/check');
};
