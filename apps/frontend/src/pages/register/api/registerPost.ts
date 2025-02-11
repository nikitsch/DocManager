import { IRegisterForm } from '../model/useRegisterForm';

export const registerPost = async (registerData: IRegisterForm) => {
  const res = await fetch('api/users/register', {
    method: 'POST',
    body: JSON.stringify(registerData),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Registration error');
  }

  return res.json();
};
