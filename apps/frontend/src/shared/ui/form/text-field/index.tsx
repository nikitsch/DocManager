import { useFormContext } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import CustomFormControl from '~shared/ui/form/custom-form-control';

import type { FC } from 'react';
import type { TextFieldProps } from '@mui/material/TextField';
import { validationRules } from '~shared/model/validation/validationRules';

interface IFormTextFieldProps extends Omit<TextFieldProps, 'name'> {
  name: string;
  minLength?: number;
  maxLength?: number;
}

const FormTextField: FC<IFormTextFieldProps> = (props) => {
  const {
    name,
    label,
    required,
    minLength,
    maxLength,
    fullWidth = true,
    size = 'small',
    ...textFieldProps
  } = props;

  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = errors[name];

  const rules = validationRules(required, minLength, maxLength);

  return (
    <CustomFormControl
      label={label}
      required={required}
      fullWidth={fullWidth}
      validationError={error}
    >
      <TextField
        {...textFieldProps}
        {...register(name, rules)}
        id={name}
        error={!!error}
        // helperText={error ? String(error.message) : ''} // move to CustomFormControl
        required={required}
        fullWidth={fullWidth}
        size={size}
      />
    </CustomFormControl>
  );
};

export default FormTextField;
