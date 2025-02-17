import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import { ArrowUpIcon } from '~shared/ui/CustomIcons';
import { FilterBarPosition } from '../model/useFilterBarPosition';
import { useTableRecordControls } from '../model/useTableRecordControls';

import type { FC } from 'react';

type FilterControlPanelProps = {
  filterBarPosition: FilterBarPosition;
  setfilterBarPosition: (position: FilterBarPosition) => void;
};

const FilterControlPanel: FC<FilterControlPanelProps> = (props) => {
  const { filterBarPosition, setfilterBarPosition } = props;

  const { handleClearFilter } = useTableRecordControls();

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
        onClick={handleClearFilter}
      >
        Clear
      </Button>
    </Stack>
  );
};

export default FilterControlPanel;
