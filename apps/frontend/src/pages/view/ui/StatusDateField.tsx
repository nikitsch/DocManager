import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { cloneElement } from 'react';
import { useFormContext } from 'react-hook-form';
import { RecordStatusIconMapper } from '~pages/archive/lib/recordStatusMapper';
import { RecordStatus } from '~shared/model/enum';
import { RecordStatusLabelMapper } from '~shared/model/constant';
import { RecordViewForm } from '../model/useRecordViewForm';
import { getLastModifiedDate } from '../model/getLastModifiedDate';

import type { FC } from 'react';

type StatusDateFieldProps = {
  status: RecordStatus;
};

const StatusDateField: FC<StatusDateFieldProps> = (props) => {
  const { status } = props;

  const { watch } = useFormContext<RecordViewForm>();

  const created_at = watch('created_at');
  const updated_at = watch('updated_at');
  const in_process_at = watch('in_process_at');
  const rejected_at = watch('rejected_at');
  const finished_at = watch('finished_at');

  const icon = cloneElement(RecordStatusIconMapper[status] || <p>?</p>, {
    sx: { fontSize: 35 },
  });

  const date = getLastModifiedDate({
    created_at,
    updated_at,
    in_process_at,
    rejected_at,
    finished_at,
  });

  return (
    <Stack direction="row" alignItems="center" mb={4} gap={2}>
      <Tooltip title={RecordStatusLabelMapper[status]}>{icon}</Tooltip>
      {date && <Typography>{date}</Typography>}
    </Stack>
  );
};

export default StatusDateField;
