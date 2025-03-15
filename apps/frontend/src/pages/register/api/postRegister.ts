import { fetchWithHandling } from '~shared/api/fetchWithHandling';
import { IRegisterForm } from '../model/useRegisterForm';
import { IUser } from '~shared/model/interface';

export const postRegister = async (registerData: IRegisterForm) => {
  return fetchWithHandling<IUser>('api/users/register', {
    method: 'POST',
    body: JSON.stringify(registerData),
    headers: { 'Content-Type': 'application/json' },
  });
};
