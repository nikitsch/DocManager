import { useForm } from 'react-hook-form';

interface ILoginForm {
  username: string;
  password: string;
}

type FormType = ILoginForm;

export const useLoginForm = () => {
  const form = useForm<FormType>();

  const handleSubmit = ({ username, password }: FormType) => {
    alert(`username: ${username}, password: ${password}`);
  };

  return { form, isLoading: false, onSubmit: handleSubmit };
};
