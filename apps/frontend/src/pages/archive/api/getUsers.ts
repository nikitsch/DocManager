import { IUser } from '~shared/model/interface';

export const getUsers = async () => {
  const res = await fetch('/api/users');

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Request error');
  }

  return res.json() as Promise<IUser[]>;
};
