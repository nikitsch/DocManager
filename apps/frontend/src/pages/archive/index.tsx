import Stack from '@mui/material/Stack';
import FilterBar from './ui/FilterBar';
import FilterControlPanel from './ui/FilterControlPanel';
import SearchPanel from './ui/SearchPanel';
import TableRecords from './ui/TableRecords';
import { useFilterBarPosition } from './model/useFilterBarPosition';

import type { FC } from 'react';

const ArchivePage: FC = () => {
  const { filterBarPosition, isFBPOpen, setfilterBarPosition } =
    useFilterBarPosition();

  return (
    <Stack gap={3}>
      <Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <FilterControlPanel
            filterBarPosition={filterBarPosition}
            setfilterBarPosition={setfilterBarPosition}
          />
          <SearchPanel />
        </Stack>
        <FilterBar isFBPOpen={isFBPOpen} />
      </Stack>
      <TableRecords />
    </Stack>
  );
};

export default ArchivePage;
