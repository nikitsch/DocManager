import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';
import SearchPanel from './SearchPanel';

import type { FC } from 'react';

type FilterBarProps = {
  isFBPOpen: boolean;
};

const FilterBar: FC<FilterBarProps> = (props) => {
  const { isFBPOpen } = props;

  return (
    <Collapse in={isFBPOpen}>
      <Stack mt={3}>
        <SearchPanel />
        <SearchPanel />
        <SearchPanel />
      </Stack>
    </Collapse>
  );
};

export default FilterBar;
