import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { ApiError } from '~shared/api/ApiError';
import { IUser } from '~shared/model/interface';
import { MutationOptionsType } from '~shared/model/type';
import { RoutesPaths } from '~shared/model/enum';
import { postRegister } from '../api/postRegister';

export interface IRegisterForm {
  username: string;
  password: string;
  organization_name: string;
}

type FormType = IRegisterForm;

export const useRegisterForm = (
  mutationOptions: MutationOptionsType<IUser, IRegisterForm> = {}
) => {
  const form = useForm<FormType>();
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    ...mutationOptions,
    mutationFn: postRegister,
    onSuccess: () => {
      //TODO: in response receive a new user without a password
      navigate(`/${RoutesPaths.LOGIN}`, { replace: true });
    },
    onError: ({ message }: ApiError) => {
      form.setError('username', { type: 'server', message });
    },
  });

  const handleSubmit = (registerData: FormType) => mutate(registerData);

  return { form, isPending, onSubmit: handleSubmit };
};
