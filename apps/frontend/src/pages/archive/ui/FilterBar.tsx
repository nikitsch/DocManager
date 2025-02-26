import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';
import FormSelect from '~shared/ui/form/select';
import FormToggleButtonGroup from '~shared/ui/form/toggle-button-group';
import { useIsAdmin } from '~shared/model/helper/useIsAdmin';
import { getSelectOptions } from '~shared/model/helper/getSelectOptions';
import {
  TaxPeriodLabelMapper,
  TimeBreakpointsLabelMapper,
} from '~shared/model/constant';
import { recordStatusOptions } from '../lib/recordStatusMapper';
import { useUsersOptions } from '../model/useUsersOptions';

import type { FC } from 'react';
import FormDatePicker from '~shared/ui/form/date-picker';

type FilterBarProps = {
  isFBPOpen: boolean;
};

const FilterBar: FC<FilterBarProps> = (props) => {
  const { isFBPOpen } = props;

  const timeBreakpointsOptions = getSelectOptions(
    TimeBreakpointsLabelMapper,
    true
  );
  const taxPeriodOptions = getSelectOptions(TaxPeriodLabelMapper, true);
  const [usersOptions] = useUsersOptions();
  const isAdmin = useIsAdmin();

  return (
    <Collapse in={isFBPOpen}>
      <Stack direction="row" flexWrap="wrap" mt={3} rowGap={2} columnGap={5}>
        <FormDatePicker name='from' label="Period" />
        <FormDatePicker name='to' label="Period" />
        <FormToggleButtonGroup
          name="time_breakpoints"
          label="Quick jump"
          options={timeBreakpointsOptions}
        />
        <FormToggleButtonGroup
          name="record_status"
          label="Recording status"
          options={recordStatusOptions}
        />
        <FormSelect
          name="tax_period"
          label="Tax period"
          options={taxPeriodOptions}
          fullWidth={false}
          blankOptionItem
        />
        {isAdmin && (
          <FormSelect
            name="user_id"
            label="Organization name"
            options={usersOptions}
            fullWidth={false}
            blankOptionItem
          />
        )}
      </Stack>
    </Collapse>
  );
};

export default FilterBar;
