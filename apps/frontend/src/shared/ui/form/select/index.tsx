import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Controller, useFormContext } from 'react-hook-form';
import CustomFormControl from '~shared/ui/form/custom-form-control';
import { DEFAULT_FIELD_WIDTH } from '~shared/model/constant';
import { SelectOption } from '~shared/model/type';
import { validationRules } from '~shared/model/validation/validationRules';

import type { FC } from 'react';
import type { SelectProps } from '@mui/material/Select';

interface IFormSelectProps extends Omit<SelectProps, 'name'> {
  name: string;
  blankOptionItem?: boolean;
  options: SelectOption[];
}

const FormSelect: FC<IFormSelectProps> = (props) => {
  const {
    name,
    blankOptionItem,
    options,
    label,
    required,
    fullWidth = true,
    size = 'small',
    sx,
    ...selectProps
  } = props;

  const {
    control,
    formState: { errors },
  } = useFormContext();
  const error = errors[name];

  return (
    <Controller
      name={name}
      control={control}
      rules={validationRules(required)}
      render={({ field }) => (
        <CustomFormControl
          label={label}
          required={required}
          validationError={error}
          fullWidth={fullWidth}
        >
          <Select
            {...selectProps}
            {...field}
            id={name}
            error={!!error}
            required={required}
            size={size}
            sx={{
              width: fullWidth ? '100%' : DEFAULT_FIELD_WIDTH,
              ...sx,
            }}
          >
            {blankOptionItem && (
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
            )}
            {options.map(({ value: itemValue, label: itemLabel, ...props }) => (
              <MenuItem key={String(itemValue)} value={itemValue} {...props}>
                {itemLabel}
              </MenuItem>
            ))}
          </Select>
        </CustomFormControl>
      )}
    />
  );
};

export default FormSelect;
