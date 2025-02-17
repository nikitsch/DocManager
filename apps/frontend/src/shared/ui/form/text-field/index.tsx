import { useFormContext } from 'react-hook-form';
import TextField from '@mui/material/TextField';

import type { FC } from 'react';
import type { TextFieldProps } from '@mui/material/TextField';

interface IFormTextFieldProps extends Omit<TextFieldProps, 'name'> {
  name: string;
  maxLength?: number;
  minLength?: number;
}

const FormTextField: FC<IFormTextFieldProps> = (props) => {
  const {
    name,
    required,
    maxLength,
    minLength,
    fullWidth = true,
    ...textFieldProps
  } = props;

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
      {...textFieldProps}
      id={name}
      error={!!error}
      helperText={error ? String(error.message) : ''}
      required={required}
      fullWidth={fullWidth}
      {...register(name, validationRules)}
    />
  );
};

export default FormTextField;
