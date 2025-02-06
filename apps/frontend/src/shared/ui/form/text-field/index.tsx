import TextField from '@mui/material/TextField';
import { useFormContext } from 'react-hook-form';
import type { FC } from 'react';
import type { TextFieldProps } from '@mui/material/TextField';

type FormTextFieldPropsType = Omit<TextFieldProps, 'name'> & {
  name: string;
  maxLength?: number;
  minLength?: number;
};

const FormTextField: FC<FormTextFieldPropsType> = ({
  name,
  required,
  maxLength,
  minLength,
  ...props
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];
  const validationRules = {
    required: required ? 'Field is required' : undefined,
    maxLength: maxLength
      ? {
          value: maxLength,
          message: `Field must be no more than ${maxLength} characters long`,
        }
      : undefined,
    minLength: minLength
      ? {
          value: minLength,
          message: `Field must be at least ${minLength} characters long`,
        }
      : undefined,
  };

  return (
    <TextField
      id={name}
      error={!!error}
      helperText={error ? String(error.message) : ''}
      required={required}
      {...register(name, validationRules)}
      {...props}
    />
  );
};

export default FormTextField;
