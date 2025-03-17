import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useMutationHandler } from '~features/api/model/useMutationHandler';
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

  const { mutate, ...restMutation } = useMutationHandler<IRecord, IPostRecord>({
    ...mutationOptions,
    mutationFn: postRecord,
    onSuccess: () => {
      navigate(`/${RoutesPaths.ARCHIVE}`);
    },
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
    mutation: { ...restMutation, mutate },
    isDisabled: !!Object.keys(errors).length,
    files,
    filesError: errors?.files,
    onRemoveFile: handleRemoveFile,
    onSubmit: handleSubmit,
  };
};
