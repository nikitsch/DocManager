import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import type { FC, ReactNode } from 'react';
import type { FormControlProps } from '@mui/material/FormControl';

interface ICustomFormControlProps extends FormControlProps {
  label: ReactNode;
}

const CustomFormControl: FC<ICustomFormControlProps> = (props) => {
  const { label, required, children, ...formControlProps } = props;

  return (
    <FormControl required={required} {...formControlProps}>
      <Stack display="flex" flexDirection="column" gap={1}>
        <FormLabel required={required}>{label}</FormLabel>
        {children}
      </Stack>
    </FormControl>
  );
};

export default CustomFormControl;
