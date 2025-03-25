import { useMutation } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { useUserAuthStore } from '~entities/user-auth/model/useUserAuthStore';
import { useFormStore } from '~entities/form/model/useFormStore';
import { ApiError } from '~features/api/model/ApiError';
import { useClearAppState } from '~shared/model/helper/useClearAppState';
import { RoutesPaths } from '~shared/model/enum';
import { DEFAULT_REDIRECT_PARAM } from '~shared/model/constant';
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
  const formCreate = useFormStore((state) => state.formCreate);
  const setUser = useUserAuthStore((state) => state.setUser);

  const { clearFormCreateState } = useClearAppState();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const form = useForm<FormType>();

  const { mutate, ...restMutation } = useMutation({
    ...mutationOptions,
    mutationFn: postLogin,
    onSuccess: (data) => {
      if (data.userid !== formCreate?.auth_user_id) {
        clearFormCreateState();
      }

      setUser(data);

      const redirectPath =
        searchParams.get(DEFAULT_REDIRECT_PARAM) || `/${RoutesPaths.ARCHIVE}`;
      setTimeout(() => {
        navigate(redirectPath, { replace: true });
      }, 0);
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

  return {
    form,
    mutation: { ...restMutation, mutate },
    onSubmit: handleSubmit,
  };
};
