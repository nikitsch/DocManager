import { fetchWithHandling } from "~shared/api/fetchWithHandling";

export const postLogout = async () => {
  return fetchWithHandling<{ message: string }>('api/auth/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
};
