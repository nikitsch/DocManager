import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import theme from '~shared/config/muiTheme';
import { FileForm } from '~shared/model/type';
import CustomFormControl from '../form/custom-form-control';

import type { FC, PropsWithChildren } from 'react';

interface IFilePanelProps extends PropsWithChildren {
  count: number;
  error: FieldError | Merge<FieldError, FieldErrorsImpl<FileForm>> | undefined;
}

const FilePanel: FC<IFilePanelProps> = (props) => {
  const { count, error, children } = props;

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
