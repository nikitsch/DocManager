import { Controller, useFormContext } from 'react-hook-form';
import { endOfDay } from 'date-fns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CustomFormControl from '~shared/ui/form/custom-form-control';
import {
  DEFAULT_DATE_FORMAT,
  DEFAULT_MAX_DATE,
  DEFAULT_MIN_DATE,
} from '~shared/model/constant';
import {
  convertDateToISOString,
  convertISOStringToDate,
} from '~shared/model/dates';

import type { FC } from 'react';
import type { DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import type { PickerValidDate } from '@mui/x-date-pickers/models';

interface IFormDatePickerProps<TDate extends PickerValidDate>
  extends DatePickerProps<TDate> {
  name: string;
  convertByEndOfDay?: boolean;
}

const FormDatePicker: FC<IFormDatePickerProps<PickerValidDate>> = (props) => {
  const {
    name,
    convertByEndOfDay = false,
    label,
    defaultValue,
    maxDate: externalMaxDate,
    minDate: externalMinDate,
    onChange,
    ...datePickerProps
  } = props;

  const { control } = useFormContext();

  const maxDate = externalMaxDate ?? DEFAULT_MAX_DATE;
  const minDate = externalMinDate ?? DEFAULT_MIN_DATE;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <CustomFormControl
          label={label}
          sx={{
            width: '12rem',
          }}
        >
          <DatePicker
            {...datePickerProps}
            name={name}
            format={DEFAULT_DATE_FORMAT}
            slotProps={{
              textField: {
                size: 'small',
              },
              field: { clearable: true, onClear: () => field.onChange(null) },
            }}
            value={convertISOStringToDate(field.value ?? defaultValue)}
            onChange={(date, context) => {
              if (!date) return field.onChange(null);

              const newDate = convertDateToISOString(
                convertByEndOfDay ? endOfDay(date) : date
              );

              if (onChange) {
                onChange(date, context);
              }

              field.onChange(newDate);
            }}
            minDate={minDate}
            maxDate={maxDate}
          />
        </CustomFormControl>
      )}
    />
  );
};

export default FormDatePicker;
