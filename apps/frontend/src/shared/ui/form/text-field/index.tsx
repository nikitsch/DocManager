import { useFormContext } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

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
    size = 'small',
    label,
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
    <FormControl>
      <Stack display="flex" flexDirection="column" gap={1}>
        <FormLabel required={required}>{label}</FormLabel>
        <TextField
          {...textFieldProps}
          id={name}
          error={!!error}
          helperText={error ? String(error.message) : ''}
          required={required}
          fullWidth={fullWidth}
          size={size}
          {...register(name, validationRules)}
        />
      </Stack>
    </FormControl>
  );
};

export default FormTextField;
