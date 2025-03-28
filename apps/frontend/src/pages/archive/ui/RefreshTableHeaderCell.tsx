import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import { useEffect, useState } from 'react';
import { RefreshIcon } from '~shared/ui/custom-icons';
import { useRecords } from '../model/useRecords';
import { useUsers } from '../model/useUsers';

const RefreshTableHeaderCell = () => {
  const { refetch: refetchRecords, isFetching: isFetchingRecords } =
    useRecords();
  const { refetch: refetchUsers, isFetching: isFetchingUsers } = useUsers();

  const isFetching = isFetchingRecords || isFetchingUsers;

  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    if (isFetching) {
      setIsSpinning(true);
    } else if (isSpinning) {
      const timer = setTimeout(() => setIsSpinning(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isFetching, isSpinning]);

  const handleClick = async () => {
    if (isFetching) return;

    setIsSpinning(true);

    const minDuration = new Promise((resolve) => setTimeout(resolve, 1000));
    await Promise.all([refetchRecords(), refetchUsers(), minDuration]);
  };

  return (
    <Link
      component="button"
      variant="subtitle2"
      fontWeight="bold"
      color="secondary"
      underline="none"
      onClick={handleClick}
      sx={{
        opacity: isSpinning ? 0.5 : 1,
        pointerEvents: isSpinning ? 'none' : 'auto',
      }}
    >
      <Stack direction="row" alignItems="center" gap={1}>
        <RefreshIcon
          sx={{
            animation: isSpinning ? 'spin 0.6s linear infinite' : 'none',
            '@keyframes spin': {
              '0%': { transform: 'rotate(0deg)' },
              '100%': { transform: 'rotate(360deg)' },
            },
          }}
        />
        Refresh
      </Stack>
    </Link>
  );
};

export default RefreshTableHeaderCell;
