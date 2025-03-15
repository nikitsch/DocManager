import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { RoutesPaths } from '~shared/model/enum';
import { useUserAuthStore } from '~entities/user-auth/model/useUserAuthStore';
import { ApiError } from '~shared/api/ApiError';
import { IUserAuthResponse } from '~shared/model/interface';
import { MutationOptionsType } from '~shared/model/type';
import { postLogin } from '../api/postLogin';

export interface ILoginForm {
  username: string;
  password: string;
}
type FormType = ILoginForm;

export const useLoginForm = (
  mutationOptions: MutationOptionsType<IUserAuthResponse, ILoginForm> = {}
) => {
  const navigate = useNavigate();
  const form = useForm<FormType>();
  const setUser = useUserAuthStore((state) => state.setUser);

  const { isPending, mutate } = useMutation({
    ...mutationOptions,
    mutationFn: postLogin,
    onSuccess: (data) => {
      setUser(data);
      navigate(`/${RoutesPaths.ARCHIVE}`, { replace: true });
    },
    onError: (error: ApiError) => {
      const { statusCode, message } = error;
      const type = 'server';

      if (statusCode === 404) {
        form.setError('username', { type, message });
      }

      if (statusCode === 401) {
        form.setError('password', { type, message });
      }
    },
  });

  const handleSubmit = (loginData: FormType) => mutate(loginData);

  return { form, isPending, onSubmit: handleSubmit };
};
