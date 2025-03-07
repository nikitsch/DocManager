import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

import type { FC, ReactNode } from 'react';
import type { FormControlProps } from '@mui/material/FormControl';
import { Typography } from '@mui/material';

interface ICustomFormControlProps extends FormControlProps {
  label?: ReactNode;
  // eslint-disable-next-line
  validationError?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}

const CustomFormControl: FC<ICustomFormControlProps> = (props) => {
  const { label, validationError, required, children, ...formControlProps } =
    props;

  return (
    <FormControl required={required} {...formControlProps}>
      <Stack flexDirection="column">
        {label && (
          <FormLabel
            required={required}
            error={!!validationError}
            sx={{ marginBottom: 1 }}
          >
            {label}
          </FormLabel>
        )}
        {children}
        {validationError && (
          <FormHelperText sx={{ marginTop: '4px' }}>
            {validationError && (
              <Typography color="#d32f2f" variant="inherit">
                {String(validationError.message)}
              </Typography>
            )}
          </FormHelperText>
        )}
      </Stack>
    </FormControl>
  );
};

export default CustomFormControl;
