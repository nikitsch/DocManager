import { IRecord } from '~shared/model/interface';

export const getRecords = async (params: string) => {
  const res = await fetch(`/api/records?${params}`);

  if (!res.ok) {
    const errorData = await res.json();
    // eslint-disable-next-line
    throw { statusCode: errorData.statusCode, message: errorData.message };
  }

  return res.json() as Promise<{ data: IRecord[]; total: number }>;
};
