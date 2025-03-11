import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useFormContext } from 'react-hook-form';
import theme from '~shared/config/muiTheme';
import CustomFormControl from '../form/custom-form-control';

import type { FC, PropsWithChildren } from 'react';

interface IFilePanelProps extends PropsWithChildren {
  field: string;
}

const FilePanel: FC<IFilePanelProps> = (props) => {
  const { field, children } = props;

  const {
    formState: { errors },
    getValues,
  } = useFormContext();
  const error = errors[field];

  const count = getValues(field)?.length || 0;
  const color = theme.palette[error ? 'error' : 'primary'].main;

  return (
    <CustomFormControl validationError={error} sx={{ width: '100%' }}>
      <Stack direction="row" alignItems="center" gap={1} color={color}>
        <Typography fontWeight="bold">
          {count} file{count === 1 ? '' : 's'}
        </Typography>
        {children}
        <Divider
          aria-hidden="true"
          sx={{ flexGrow: 1, borderBottomWidth: 2, backgroundColor: color }}
        />
      </Stack>
    </CustomFormControl>
  );
};

export default FilePanel;
