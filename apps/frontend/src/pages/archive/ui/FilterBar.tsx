import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';
import FormSelect from '~shared/ui/form/select';
import FormToggleButtonGroup from '~shared/ui/form/toggle-button-group';
import { taxPeriodOptions } from '~shared/model/constant';
import { filterBarStatusOptions } from '../config/filterBarStatusOptions';

import type { FC } from 'react';

type FilterBarProps = {
  isFBPOpen: boolean;
};

const FilterBar: FC<FilterBarProps> = (props) => {
  const { isFBPOpen } = props;

  return (
    <Collapse in={isFBPOpen}>
      <Stack direction="row" flexWrap="wrap" mt={3} gap={5}>
        <FormToggleButtonGroup
          name="record_status"
          label="Recording status"
          options={filterBarStatusOptions}
        />
        <FormSelect
          name="tax_period"
          label="Tax period"
          options={taxPeriodOptions}
          fullWidth={false}
          blankOptionItem
        />
      </Stack>
    </Collapse>
  );
};

export default FilterBar;
