import { Controller, useFormContext } from 'react-hook-form';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { SelectOption } from '~shared/model/type';
import FormToggleButton from './toggle-button';
import CustomFormControl from '../custom-form-control';

import type { FC } from 'react';
import type { ToggleButtonGroupProps } from '@mui/material/ToggleButtonGroup';

interface IFormToggleButtonGroupProps
  extends Omit<ToggleButtonGroupProps, 'name'> {
  name: string;
  label: string;
  options: SelectOption[];
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

  const { control } = useFormContext();

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
            onChange={(_, newValue) => field.onChange(newValue)}
          >
            {options.map(({ value: itemValue, ...props }) => (
              <FormToggleButton
                key={String(itemValue)}
                value={String(itemValue)}
                {...props}
              />
            ))}
          </ToggleButtonGroup>
        </CustomFormControl>
      )}
    />
  );
};

export default FormToggleButtonGroup;
