import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import { ArrowUpIcon } from '~shared/ui/custom-icons';
import { useTableRecordControls } from '../model/useTableRecordControls';

import type { FC } from 'react';

type FilterControlPanelProps = {
  isFilterBarOpen: boolean;
  switchFilterBarPositions: () => void;
  onResetFilters: () => void;
};

const FilterControlPanel: FC<FilterControlPanelProps> = (props) => {
  const { isFilterBarOpen, switchFilterBarPositions, onResetFilters } = props;

  const { tableSearchParams } = useTableRecordControls();

  return (
    <Stack direction="row" gap={1} alignItems="center">
      <Stack color={(theme) => theme.palette.secondary.main}>Filters</Stack>
      <IconButton
        aria-label={isFilterBarOpen ? 'Open' : 'Close'}
        color="secondary"
        sx={{
          p: 0.5,
          transform: `rotate(${isFilterBarOpen ? '180deg' : '0deg'})`,
          transition: 'transform 0.3s ease-in-out',
        }}
        onClick={() => switchFilterBarPositions()}
      >
        <ArrowUpIcon />
      </IconButton>
      {!!tableSearchParams?.filters && (
        <Button
          variant="outlined"
          size="medium"
          color="secondary"
          onClick={onResetFilters}
        >
          Clear
        </Button>
      )}
    </Stack>
  );
};

export default FilterControlPanel;
