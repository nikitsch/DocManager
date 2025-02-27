import { useWatch } from 'react-hook-form';
import { Divider, FormLabel, Stack } from '@mui/material';
import theme from '~shared/config/muiTheme';
import { convertISOStringToDate } from '~shared/model/dates';
import FormDatePicker from '../date-picker';

import type { FC } from 'react';

interface IFormDateRangePickerProps {
  nameFrom: string;
  nameTo: string;
  label: string;
}

const FormDateRangePicker: FC<IFormDateRangePickerProps> = (props) => {
  const { nameFrom, nameTo, label } = props;

  const [from, to] = useWatch({ name: [nameFrom, nameTo] });
  const maxDate = convertISOStringToDate(to) || undefined;
  const minDate = convertISOStringToDate(from) || undefined;

  return (
    <Stack display="flex" flexDirection="column" gap={1}>
      <FormLabel>{label}</FormLabel>

      <Stack display="flex" flexDirection="row" gap={1} alignItems="center">
        <FormDatePicker name={nameFrom} maxDate={maxDate} />
        <Divider
          sx={{
            height: '1px',
            width: '15px',
            backgroundColor: theme.palette.primary.main,
          }}
        />
        <FormDatePicker name={nameTo} minDate={minDate} convertByEndOfDay />
      </Stack>
    </Stack>
  );
};

export default FormDateRangePicker;
