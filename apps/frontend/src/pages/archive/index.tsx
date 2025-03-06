import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';
import Form from '~shared/ui/form/form';
import FilterBar from './ui/FilterBar';
import FilterControlPanel from './ui/FilterControlPanel';
import SearchPanel from './ui/SearchPanel';
import TableRecords from './ui/TableRecords';
import { useFilterBarPosition } from './model/useFilterBarPosition';
import { useFilterBarForm } from './model/useFilterBarForm';

import type { FC } from 'react';
import { useNavigate } from 'react-router';
import { RoutesPaths } from '~shared/model/enum';

const ArchivePage: FC = () => {
  const navigate = useNavigate();
  const { filterBarPosition, isFBPOpen, setfilterBarPosition } =
    useFilterBarPosition();
  const { form, onSetValue, onReset } = useFilterBarForm();

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
          <FilterBar isFBPOpen={isFBPOpen} onSetValue={onSetValue} />
        </Form>
      </Stack>

      <TableRecords />

      <Stack position="fixed" right={35} bottom={35}>
        <Fab
          color="primary"
          aria-label="create-record"
          onClick={() => navigate(RoutesPaths.CREATE)}
        >
          +
        </Fab>
      </Stack>
    </Stack>
  );
};

export default ArchivePage;
