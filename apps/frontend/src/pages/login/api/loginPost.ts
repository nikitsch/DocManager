import { ILoginForm } from '../model/useLoginForm';

export const loginPost = async (loginData: ILoginForm) => {
  const res = await fetch('api/auth/login', {
    method: 'POST',
    body: JSON.stringify(loginData),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) {
    const errorData = await res.json();
    // eslint-disable-next-line
    throw { statusCode: errorData.statusCode, message: errorData.message };
  }

  return res.json();
};
