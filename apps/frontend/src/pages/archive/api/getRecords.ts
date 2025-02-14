import { IRecord } from '~shared/model/interface';

export const getRecords = async (params: string) => {
  const res = await fetch(`/api/records?${params}`);

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Error loading data');
  }

  return res.json() as Promise<{ data: IRecord[]; total: number }>;
};
