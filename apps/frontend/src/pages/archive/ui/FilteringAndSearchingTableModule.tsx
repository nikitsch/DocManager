import Stack from '@mui/material/Stack';
import Form from '~shared/ui/form/form';
import FilterControlPanel from './FilterControlPanel';
import SearchPanel from './SearchPanel';
import FilterBar from './FilterBar';
import { useFilterBarForm } from '../model/useFilterBarForm';
import { useFilterBarPosition } from '../model/useFilterBarPosition';

import type { FC } from 'react';

const FilteringAndSearchingTableModule: FC = () => {
  const { form, onSetValue, onReset } = useFilterBarForm();
  const { filterBarPosition, isFBPOpen, setfilterBarPosition } =
    useFilterBarPosition();

  return (
    <Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
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
  );
};

export default FilteringAndSearchingTableModule;
