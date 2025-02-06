import { useForm } from 'react-hook-form';

interface IRegisterForm {
  username: string;
  password: string;
  organization_name: string;
}

type FormType = IRegisterForm;

export const useRegisterForm = () => {
  const form = useForm<FormType>();

  const handleSubmit = ({
    username,
    password,
    organization_name,
  }: FormType) => {
    alert(
      `username: ${username}, password: ${password}, organization_name: ${organization_name}`
    );
  };

  return { form, isLoading: false, onSubmit: handleSubmit };
};
