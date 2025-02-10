import { ILoginForm } from '../model/useLoginForm';

export const authenticationPost = async (loginData: ILoginForm) => {
  const res = await fetch('api/auth/login', {
    method: 'POST',
    body: JSON.stringify(loginData),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) {
    const errorData = await res.json();
    console.log({errorData});
    
    throw new Error(errorData.message || 'Ошибка авторизации');
  }

  return res.json();
};
