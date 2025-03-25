import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useUserAuthStore } from '~entities/user-auth/model/useUserAuthStore';
import { useFormStore } from '~entities/form/model/useFormStore';
import { useMutationHandler } from '~features/api/model/useMutationHandler';
import { useClearAppState } from '~shared/model/helper/useClearAppState';
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
  const user = useUserAuthStore((state) => state.user);
  const formCreate = useFormStore((state) => state.formCreate);
  const setFormCreate = useFormStore((state) => state.setFormCreate);

  const { clearFormCreateState } = useClearAppState();

  const navigate = useNavigate();

  const { auth_user_id, ...restFormCreate } = formCreate || {};
  const formValues = formCreate ? (restFormCreate as FormType) : defaultValues;
  const form = useForm<FormType>({ defaultValues: formValues });
  const { files } = form.watch();

  const { mutate, ...restMutation } = useMutationHandler<IRecord, IPostRecord>({
    ...mutationOptions,
    mutationFn: postRecord,
    onSuccess: () => {
      clearFormCreateState();
      navigate(`/${RoutesPaths.ARCHIVE}`);
    },
    onError: (error, variables) => {
      if (error.statusCode === 401 && error.message === 'Unauthorized') {
        setFormCreate({ ...variables, auth_user_id: user?.userid || null });
      }
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
