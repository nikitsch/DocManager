import { fetchWithHandling } from '~features/api/api/fetchWithHandling';
import { IUserAuthResponse } from '~shared/model/interface';
import { ILoginForm } from '../model/useLoginForm';

export const postLogin = async (loginData: ILoginForm) => {
  return fetchWithHandling<IUserAuthResponse>('api/auth/login', {
    method: 'POST',
    body: JSON.stringify(loginData),
    headers: { 'Content-Type': 'application/json' },
  });
};
