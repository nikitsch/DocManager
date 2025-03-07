import { TaxPeriod } from '~shared/model/enum';
import { ICreateForm } from '../model/useCreateRecordForm';

interface IPostRecord extends Omit<ICreateForm, 'tax_period' | 'record_type'> {
  tax_period: TaxPeriod;
  record_type: string;
}

export const postRecord = async (recordData: IPostRecord) => {
  const res = await fetch('api/records', {
    method: 'POST',
    body: JSON.stringify(recordData),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) {
    const errorData = await res.json();
    // // eslint-disable-next-line
    // throw { statusCode: errorData.statusCode, message: errorData.message };
    throw new Error(errorData.message || 'Request error');
  }

  return res.json();
};
