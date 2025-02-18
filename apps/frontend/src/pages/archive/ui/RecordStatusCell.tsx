import Stack from '@mui/material/Stack';
import { RecordStatusIconMapper } from '../lib/recordStatusMapper';
import { IRecord } from '~shared/model/interface';

import type { GridRenderCellParams } from '@mui/x-data-grid';

// eslint-disable-next-line
interface RecordStatusCellProps extends GridRenderCellParams<IRecord> {}

const RecordStatusCell = (props: RecordStatusCellProps) => {
  const {
    row: { record_status },
  } = props;

  return (
    <Stack justifyContent="center" alignItems="center" height="100%">
      {RecordStatusIconMapper[record_status]}
    </Stack>
  );
};

export default RecordStatusCell;
