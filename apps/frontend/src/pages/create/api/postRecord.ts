import { fetchWithHandling } from '~features/api/api/fetchWithHandling';
import { TaxPeriod } from '~shared/model/enum';
import { IRecord } from '~shared/model/interface';
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
      value.forEach(({ file }: FileForm) =>
        formData.set('files', file, file.name)
      );
    } else {
      formData.set(key, value ?? '');
    }
  });

  return fetchWithHandling<IRecord>('api/records', {
    method: 'POST',
    body: formData,
  });
};
