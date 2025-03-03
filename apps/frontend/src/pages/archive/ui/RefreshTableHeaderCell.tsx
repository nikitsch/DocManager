import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import { RefreshIcon } from '~shared/ui/custom-icons';
import { useRecords } from '../model/useRecords';

const RefreshTableHeaderCell = () => {
  const { refetch } = useRecords();

  return (
    <Link
      component="button"
      variant="subtitle2"
      fontWeight="bold"
      color="secondary"
      underline="none"
      onClick={() => refetch()}
    >
      <Stack direction="row" alignItems="center" gap={1}>
        <RefreshIcon />
        Refresh
      </Stack>
    </Link>
  );
};

export default RefreshTableHeaderCell;
