import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import Typography from '@mui/material/Typography';

import type { FC } from 'react';
import type { ToggleButtonProps } from '@mui/material/ToggleButton';

export interface IFormToggleButtonProps
  extends Omit<ToggleButtonProps, 'value'> {
  value: string;
  label: string;
  icon?: JSX.Element;
}

const FormToggleButton: FC<IFormToggleButtonProps> = (props) => {
  const { label, icon, ...toggleButtonProps } = props;

  return (
    <ToggleButton {...toggleButtonProps}>
      <Stack direction="row" alignItems="center" gap={1}>
        {icon ?? null}
        <Typography variant="button" sx={{ textTransform: 'none' }}>
          {label}
        </Typography>
      </Stack>
    </ToggleButton>
  );
};

export default FormToggleButton;
