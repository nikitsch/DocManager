import Stack from '@mui/material/Stack';
import Form from '~shared/ui/form/form';
import FilterBar from './ui/FilterBar';
import FilterControlPanel from './ui/FilterControlPanel';
import SearchPanel from './ui/SearchPanel';
import TableRecords from './ui/TableRecords';
import { useFilterBarPosition } from './model/useFilterBarPosition';
import { useFilterBarForm } from './model/useFilterBarForm';

import type { FC } from 'react';

const ArchivePage: FC = () => {
  const { filterBarPosition, isFBPOpen, setfilterBarPosition } =
    useFilterBarPosition();
  const { form, onReset } = useFilterBarForm();

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
            onResetFilters={onReset}
          />
          <SearchPanel />
        </Stack>
        <Form form={form}>
          <FilterBar isFBPOpen={isFBPOpen} />
        </Form>
      </Stack>
      <TableRecords />
    </Stack>
  );
};

export default ArchivePage;
