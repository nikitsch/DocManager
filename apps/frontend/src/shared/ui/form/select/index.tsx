import { Controller, useFormContext } from 'react-hook-form';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CustomFormControl from '~shared/ui/form/custom-form-control';

import type { FC } from 'react';
import type { SelectProps } from '@mui/material/Select';
import type { MenuItemProps } from '@mui/material/MenuItem';

interface IFormSelectProps extends Omit<SelectProps, 'name'> {
  name: string;
  blankOptionItem?: boolean;
  options: Array<MenuItemProps & { label: string }>;
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

  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <CustomFormControl
          label={label}
          required={required}
          fullWidth={fullWidth}
        >
          <Select
            {...selectProps}
            {...field}
            id={name}
            required={required}
            size={size}
            sx={{
              width: '200px',
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
