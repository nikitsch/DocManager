import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';
import Form from '~shared/ui/form/form';
import FormToggleButtonGroup from '~shared/ui/form/toggle-button-group';
import { filterBarStatusOptions } from '../config/filterBarStatusOptions';
import { useFilterBarForm } from '../model/useFilterBarForm';

import type { FC } from 'react';
import FormTextField from '~shared/ui/form/text-field';

type FilterBarProps = {
  isFBPOpen: boolean;
};

const FilterBar: FC<FilterBarProps> = (props) => {
  const { isFBPOpen } = props;

  const { form, onSubmit } = useFilterBarForm();

  return (
    <Collapse in={isFBPOpen}>
      <Form form={form} onSubmit={onSubmit}>
        <Stack direction="row" flexWrap="wrap" mt={3}>
          <FormToggleButtonGroup
            name="record_status"
            label="Recording status"
            options={filterBarStatusOptions}
          />
          <FormTextField name="user_id" />
        </Stack>
      </Form>
    </Collapse>
  );
};

export default FilterBar;
