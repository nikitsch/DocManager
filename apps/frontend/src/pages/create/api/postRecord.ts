import { TaxPeriod } from '~shared/model/enum';
import { FileForm } from '~shared/model/type';

export interface IPostRecord {
  tax_period: TaxPeriod;
  record_type: string;
  record_subtype?: string;
  record_comment: string;
  files: FileForm[];
}

export const postRecord = async (recordData: IPostRecord) => {
  const formData = new FormData();

  Object.entries(recordData).forEach(([key, value]) => {
    if (key === 'files') {
      value.forEach(({ file }: FileForm) => formData.append('files', file));
    } else {
      formData.append(key, value ?? '');
    }
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
