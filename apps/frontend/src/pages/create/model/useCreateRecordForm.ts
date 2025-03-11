import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { TaxPeriod } from '~shared/model/enum';
import { SelectOption } from '~shared/model/type';
import { postRecord } from '../api/postRecord';

export interface ICreateForm {
  tax_period: TaxPeriod | '';
  record_type: string | SelectOption | null;
  record_subtype?: string;
  record_comment: string;
  files: File[] | null;
}
type FormType = ICreateForm;

const defaultValues: FormType = {
  tax_period: '',
  record_type: null,
  record_subtype: '',
  record_comment: '',
  files: null,
};

export const useCreateRecordForm = () =>
  // files: { file: File; preview: string | null }[]
  {
    const form = useForm<FormType>({ defaultValues });
    const watch = form.watch();
    console.log({ watch });

    const { isPending, mutate } = useMutation({
      mutationFn: postRecord,
      // onSuccess: (data) => {
      //   setUser(data);
      //   navigate(`/${RoutesPaths.ARCHIVE}`, { replace: true });
      // },
      // onError: (error: { statusCode: number; message: string }) => {
      //   if (error?.statusCode === 404) {
      //     form.setError('username', { type: 'server', message: error.message });
      //   }
      //   if (error?.statusCode === 401) {
      //     form.setError('password', { type: 'server', message: error.message });
      //   }
      // },
    });

    const handleSubmit = (recordData: ICreateForm) => {
      const { tax_period, record_type, files, ...restData } = recordData;

      return mutate({
        ...restData,
        tax_period: tax_period as TaxPeriod,
        record_type:
        typeof record_type === 'string'
        ? record_type
        : (record_type?.label as string),
        files: files as File[],
      });
    };

    return { form, isPending, onSubmit: handleSubmit };
  };
