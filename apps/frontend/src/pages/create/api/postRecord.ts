import { TaxPeriod } from '~shared/model/enum';
import { ICreateForm } from '../model/useCreateRecordForm';

interface IPostRecord extends Omit<ICreateForm, 'tax_period' | 'record_type'> {
  tax_period: TaxPeriod;
  record_type: string;
  files: File[];
}

export const postRecord = async (recordData: IPostRecord) => {
  const formData = new FormData();

  Object.entries(recordData).forEach(([key, value]) => {
    if (key === 'files') {
      value.forEach((file: File) => formData.append('files', file));
      return;
    }

    formData.append(key, value ?? '');
  });

  const res = await fetch('api/records', {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json();
    // // eslint-disable-next-line
    // throw { statusCode: errorData.statusCode, message: errorData.message };
    throw new Error(errorData.message || 'Request error');
  }

  return res.json();
};
