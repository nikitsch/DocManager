import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { ApiError } from '~features/api/model/ApiError';
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

  const { mutate, ...restMutation } = useMutation({
    ...mutationOptions,
    mutationFn: postRegister,
    onSuccess: () => {
      //TODO: in response receive a new user without a password
      navigate(`/${RoutesPaths.LOGIN}`);
    },
    onError: ({ message }: ApiError) => {
      form.setError('username', { type: 'server', message });
    },
  });

  const handleSubmit = (registerData: FormType) => mutate(registerData);

  return {
    form,
    mutation: { ...restMutation, mutate },
    onSubmit: handleSubmit,
  };
};
