import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import CustomFormControl from '~shared/ui/form/custom-form-control';
import { SelectOption } from '~shared/model/type';
import { DEFAULT_FIELD_WIDTH } from '~shared/model/constant';
import { validationRules } from '~shared/model/validation/validationRules';

import type { FC } from 'react';
import type { AutocompleteProps } from '@mui/material/Autocomplete';

interface IFormAutocompleteProps
  extends Omit<
    AutocompleteProps<SelectOption, boolean, boolean, boolean>,
    'renderInput' | 'name'
  > {
  name: string;
  label: string;
  options: SelectOption[];
  required?: boolean;
  minLength?: number;
  maxLength?: number;
}

const FormAutocomplete: FC<IFormAutocompleteProps> = (props) => {
  const {
    name,
    options,
    label,
    required = false,
    freeSolo = false,
    minLength,
    maxLength,
    fullWidth = true,
    size = 'small',
    sx,
    ...autocompleteProps
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
      rules={validationRules(required, minLength, maxLength)}
      render={({ field }) => (
        <CustomFormControl
          label={label}
          required={required}
          validationError={error}
          fullWidth={fullWidth}
        >
          <Autocomplete
            {...autocompleteProps}
            {...field}
            id={name}
            options={options}
            getOptionLabel={(option) =>
              typeof option === 'string' ? option : option.label
            }
            isOptionEqualToValue={(option, value) =>
              option.value === value?.value
            }
            value={field.value}
            onInputChange={(_, newInputValue) => {
              if (freeSolo) {
                field.onChange(newInputValue);
              }
            }}
            onChange={(_, newValue) => field.onChange(newValue || null)}
            freeSolo={freeSolo}
            size={size}
            renderInput={(params) => (
              <TextField
                {...params}
                inputRef={field.ref}
                required={required}
                error={!!error}
              />
            )}
            sx={{ width: fullWidth ? '100%' : DEFAULT_FIELD_WIDTH, ...sx }}
          />
        </CustomFormControl>
      )}
    />
  );
};

export default FormAutocomplete;
