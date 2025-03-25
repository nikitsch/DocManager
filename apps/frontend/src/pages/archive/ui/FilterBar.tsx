import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';
import { UseFormSetValue } from 'react-hook-form';
import FormSelect from '~shared/ui/form/select';
import FormToggleButtonGroup from '~shared/ui/form/toggle-button-group';
import { useIsAdmin } from '~shared/model/helper/useIsAdmin';
import { getSelectOptions } from '~shared/model/helper/getSelectOptions';
import {
  TaxPeriodLabelMapper,
  TimeBreakpointsLabelMapper,
} from '~shared/model/constant';
import FormDateRangePicker from '~shared/ui/form/date-range-picker';
import { recordStatusOptions } from '../lib/recordStatusMapper';
import { useUsersOptions } from '../model/useUsersOptions';
import { IFilterBarForm } from '../model/useFilterBarForm';

import type { FC } from 'react';

type FilterBarProps = {
  isFilterBarOpen: boolean;
  onSetValue: UseFormSetValue<IFilterBarForm>;
};

const FilterBar: FC<FilterBarProps> = (props) => {
  const { isFilterBarOpen, onSetValue } = props;

  const timeBreakpointsOptions = getSelectOptions(
    TimeBreakpointsLabelMapper,
    true
  );
  const taxPeriodOptions = getSelectOptions(TaxPeriodLabelMapper, true);
  const [usersOptions] = useUsersOptions();
  const isAdmin = useIsAdmin();

  return (
    <Collapse in={isFilterBarOpen}>
      <Stack direction="row" flexWrap="wrap" mt={3} rowGap={2} columnGap={5}>
        <FormDateRangePicker
          nameFrom="from"
          nameTo="to"
          label="Period"
          onChange={() => {
            onSetValue('time_breakpoint', null);
          }}
        />
        <FormToggleButtonGroup
          name="time_breakpoint"
          label="Quick jump"
          options={timeBreakpointsOptions}
          onChange={() => {
            onSetValue('from', '');
            onSetValue('to', '');
          }}
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
