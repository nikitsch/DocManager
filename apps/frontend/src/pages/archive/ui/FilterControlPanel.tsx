import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import { ArrowUpIcon } from '~shared/ui/custom-icons';
import { FilterBarPosition } from '../model/useFilterBarPosition';

import type { FC } from 'react';

type FilterControlPanelProps = {
  filterBarPosition: FilterBarPosition;
  setfilterBarPosition: (position: FilterBarPosition) => void;
  onResetFilters: () => void;
};

const FilterControlPanel: FC<FilterControlPanelProps> = (props) => {
  const { filterBarPosition, setfilterBarPosition, onResetFilters } = props;

  const isOpen = filterBarPosition === FilterBarPosition.OPEN;

  return (
    <Stack direction="row" gap={1} alignItems="center">
      <Stack color={(theme) => theme.palette.secondary.main}>Filters</Stack>
      <IconButton
        aria-label={filterBarPosition}
        color="secondary"
        sx={{
          p: 0.5,
          transform: `rotate(${isOpen ? '0deg' : '180deg'})`,
          transition: 'transform 0.3s ease-in-out',
        }}
        onClick={() =>
          setfilterBarPosition(
            isOpen ? FilterBarPosition.CLOSE : FilterBarPosition.OPEN
          )
        }
      >
        <ArrowUpIcon />
      </IconButton>
      <Button
        variant="outlined"
        size="medium"
        color="secondary"
        onClick={onResetFilters}
      >
        Clear
      </Button>
    </Stack>
  );
};

export default FilterControlPanel;
