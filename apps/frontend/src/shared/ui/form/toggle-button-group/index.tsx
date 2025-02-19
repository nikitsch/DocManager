import { Controller, useFormContext } from 'react-hook-form';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FormToggleButton, { IFormToggleButtonProps } from './toggle-button';
import CustomFormControl from '../custom-form-control';

import type { FC } from 'react';
import type { ToggleButtonGroupProps } from '@mui/material/ToggleButtonGroup';

interface IFormToggleButtonGroupProps
  extends Omit<ToggleButtonGroupProps, 'name'> {
  name: string;
  label: string;
  options: Array<IFormToggleButtonProps>;
}

const FormToggleButtonGroup: FC<IFormToggleButtonGroupProps> = (props) => {
  const {
    name,
    label,
    options,
    exclusive = true,
    size = 'small',
    color = 'primary',
    ...toggleButtonGroupProps
  } = props;

  const { control, trigger } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <CustomFormControl label={label}>
          <ToggleButtonGroup
            {...toggleButtonGroupProps}
            id={name}
            aria-label={name}
            exclusive={exclusive}
            size={size}
            color={color}
            value={field.value}
            onChange={(_, newValue) => {
              field.onChange(newValue);
              trigger(name);
            }}
          >
            {options.map(({ value, ...props }) => (
              <FormToggleButton key={value} value={value} {...props} />
            ))}
          </ToggleButtonGroup>
        </CustomFormControl>
      )}
    />
  );
};

export default FormToggleButtonGroup;
