import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { RoutesPaths, TaxPeriod } from '~shared/model/enum';
import {
  FileForm,
  MutationOptionsType,
  SelectOption,
} from '~shared/model/type';
import { IPostRecord, postRecord } from '../api/postRecord';
import { IRecord } from '~shared/model/interface';

export interface ICreateForm {
  tax_period: TaxPeriod | '';
  record_type: string | SelectOption | null;
  record_subtype?: string;
  record_comment: string;
  files: FileForm[] | null;
}
type FormType = ICreateForm;

const defaultValues: FormType = {
  tax_period: '',
  record_type: null,
  record_subtype: '',
  record_comment: '',
  files: null,
};

export const useCreateRecordForm = (
  mutationOptions: MutationOptionsType<IRecord, IPostRecord> = {}
) => {
  const navigate = useNavigate();
  const form = useForm<FormType>({ defaultValues });
  const { files } = form.watch();

  const { isPending, mutate } = useMutation({
    ...mutationOptions,
    mutationFn: postRecord,
    onSuccess: () => {
      navigate(`/${RoutesPaths.ARCHIVE}`);
    },
    // onError: (error: { statusCode: number; message: string }) => {
    //   if (error?.statusCode === 404) {
    //     form.setError('username', { type: 'server', message: error.message });
    //   }
    //   if (error?.statusCode === 401) {
    //     form.setError('password', { type: 'server', message: error.message });
    //   }
    // },
  });

  const { errors } = form.formState;

  const handleRemoveFile = (deletedId: string) => {
    const value = (files || []).filter(({ id }) => id !== deletedId);

    if (!value.length) {
      form.resetField('files');
    } else {
      form.setValue('files', value);
    }

    form.trigger('files');
  };

  const handleSubmit = (recordData: FormType) => {
    const { record_type: type, ...restData } = recordData;

    const record_type = typeof type === 'string' ? type : type?.label;
    const mutateData = { ...restData, record_type } as IPostRecord;

    return mutate(mutateData);
  };

  return {
    form,
    isPending,
    isDisabled: !!Object.keys(errors).length,
    files,
    filesError: errors?.files,
    onRemoveFile: handleRemoveFile,
    onSubmit: handleSubmit,
  };
};
