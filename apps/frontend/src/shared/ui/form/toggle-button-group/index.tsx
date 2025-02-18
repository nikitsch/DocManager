import { Controller, useFormContext } from 'react-hook-form';
import Stack from '@mui/material/Stack';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormToggleButton, { IFormToggleButtonProps } from './toggle-button';

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
        <FormControl>
          <Stack display="flex" flexDirection="column" gap={1}>
            <FormLabel>{label}</FormLabel>
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
          </Stack>
        </FormControl>
      )}
    />
  );
};

export default FormToggleButtonGroup;
