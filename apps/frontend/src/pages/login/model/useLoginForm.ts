import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { RoutesPaths } from '~shared/enum/Routes';
import { loginPost } from '../api/loginPost';

export interface ILoginForm {
  username: string;
  password: string;
}
type FormType = ILoginForm;

export const useLoginForm = () => {
  const form = useForm<FormType>();
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationFn: loginPost,
    onSuccess: (data) => {
      console.log({ data });
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
