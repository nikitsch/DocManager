import { IRecordTypeEntity } from '~shared/model/interface';

export const getRecordTypes = async () => {
  const res = await fetch('/api/records/types');

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Request error');
  }

  return res.json() as Promise<IRecordTypeEntity[]>;
};
