import { fetchWithHandling } from '~features/api/api/fetchWithHandling';
import { IUser } from '~shared/model/interface';
import { IRegisterForm } from '../model/useRegisterForm';

export const postRegister = async (registerData: IRegisterForm) => {
  return fetchWithHandling<IUser>('api/users/register', {
    method: 'POST',
    body: JSON.stringify(registerData),
    headers: { 'Content-Type': 'application/json' },
  });
};
