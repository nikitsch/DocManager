import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { RoutesPaths } from '~shared/model/enum';
import { useUserAuthStore } from '~entities/user-auth/model/useUserAuthStore';
import { postLogin } from '../api/postLogin';

export interface ILoginForm {
  username: string;
  password: string;
}
type FormType = ILoginForm;

export const useLoginForm = () => {
  const navigate = useNavigate();
  const form = useForm<FormType>();
  const setUser = useUserAuthStore((state) => state.setUser);

  const { isPending, mutate } = useMutation({
    mutationFn: postLogin,
    onSuccess: (data) => {
      setUser(data);
      navigate(`/${RoutesPaths.ARCHIVE}`, { replace: true });
    },
    onError: (error: { statusCode: number; message: string }) => {
      if (error?.statusCode === 404) {
        form.setError('username', { type: 'server', message: error.message });
      }
      if (error?.statusCode === 401) {
        form.setError('password', { type: 'server', message: error.message });
      }
    },
  });

  const handleSubmit = (loginData: FormType) => mutate(loginData);

  return { form, isPending, onSubmit: handleSubmit };
};
