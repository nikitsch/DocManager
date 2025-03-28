import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import CustomFormControl from '~shared/ui/form/custom-form-control';
import { validationRules } from '~shared/model/validation/validationRules';

import type { FC } from 'react';
import type { TextFieldProps } from '@mui/material/TextField';

interface IFormTextFieldProps extends Omit<TextFieldProps, 'name'> {
  name: string;
  minLength?: number;
  maxLength?: number;
  readOnly?: boolean;
  // eslint-disable-next-line
  transformValue?: (value: any) => string;
}

const FormTextField: FC<IFormTextFieldProps> = (props) => {
  const {
    name,
    label,
    required,
    minLength,
    maxLength,
    slotProps = {},
    fullWidth = true,
    readOnly = false,
    size = 'small',
    transformValue,
    ...textFieldProps
  } = props;

  const {
    control,
    formState: { errors },
  } = useFormContext();
  const error = errors[name];

  const { input: inputSlotProps, ...restSlotProps } = slotProps;

  return (
    <Controller
      name={name}
      control={control}
      rules={validationRules(required, minLength, maxLength)}
      render={({ field }) => (
        <CustomFormControl
          label={label}
          required={required}
          validationError={error}
          fullWidth={fullWidth}
        >
          <TextField
            {...textFieldProps}
            {...field}
            id={name}
            value={transformValue ? transformValue(field.value) : field.value}
            error={!!error}
            required={required}
            fullWidth={fullWidth}
            size={size}
            slotProps={{
              input: {
                readOnly,
                ...inputSlotProps,
              },
              ...restSlotProps,
            }}
          />
        </CustomFormControl>
      )}
    />
  );
};

export default FormTextField;
