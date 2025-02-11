import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { RoutesPaths } from '~shared/enum/Routes';
import { registerPost } from '../api/registerPost';

export interface IRegisterForm {
  username: string;
  password: string;
  organization_name: string;
}

type FormType = IRegisterForm;

export const useRegisterForm = () => {
  const form = useForm<FormType>();
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationFn: registerPost,
    onSuccess: () => {
      //TODO: in response receive a new user without a password
      navigate(`/${RoutesPaths.LOGIN}`, { replace: true });
    },
    onError: (error: Error) => {
      form.setError('username', { type: 'server', message: error.message });
    },
  });

  const handleSubmit = (registerData: FormType) => mutate(registerData);

  return { form, isPending, onSubmit: handleSubmit };
};
