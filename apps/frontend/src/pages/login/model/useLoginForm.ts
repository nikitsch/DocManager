import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { authenticationPost } from '../api/authenticationPost';
import { useNavigate } from 'react-router';
import { RoutesPaths } from '~shared/enum/Routes';

export interface ILoginForm {
  username: string;
  password: string;
}

type FormType = ILoginForm;

export const useLoginForm = () => {
  const form = useForm<FormType>();
  const navigate = useNavigate();

  const { isSuccess, isPending, isError, error, mutate } = useMutation({
    mutationFn: authenticationPost,
    onSuccess: (data) => {
      console.log({data});
      navigate(`/${RoutesPaths.ARCHIVE}`, { replace: true });
    },
  });
  console.log({ isSuccess, isError, error });

  const handleSubmit = (loginData: FormType) => mutate(loginData);

  return { form, isPending, error, onSubmit: handleSubmit };
};
