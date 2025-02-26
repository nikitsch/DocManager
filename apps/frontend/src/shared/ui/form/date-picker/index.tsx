import { Controller, useController, useFormContext } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CustomFormControl from '~shared/ui/form/custom-form-control';

import { useState, type FC } from 'react';
import type { DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import type { PickerValidDate } from '@mui/x-date-pickers/models';
import { convertDateToISOString, convertISOStringToDate } from '~shared/model/dates';

const DEFAULT_MIN_DATE = new Date(2024, 0, 1);
const DEFAULT_MAX_DATE = new Date(2099, 0, 1);

interface IFormDatePickerProps<TDate extends PickerValidDate>
  extends DatePickerProps<TDate> {
  name: string;
  // rules?: RegisterOptions<TFieldValues>;
  // variant?: TextFieldVariants;
}

const FormDatePicker: FC<IFormDatePickerProps<PickerValidDate>> = (props) => {
  const {
    name,
    label,
    defaultValue,
    maxDate: externalMaxDate,
    minDate: externalMinDate,
    ...datePickerProps
  } = props;

  const { control } = useFormContext();
  const {
    field: { value, onChange, ...restField },
    // fieldState: { invalid },
    // formState: { errors },
  } = useController({
    control,
    name,
    // rules: { ...transformedRules, ...baseValidation },
  });

  const maxDate = externalMaxDate ?? DEFAULT_MAX_DATE;
  const minDate = externalMinDate ?? DEFAULT_MIN_DATE;

  const [dateValue, setDateValue] = useState<Date | null>(() =>
    convertISOStringToDate(value),
  );

  return (
    <Controller
      name={name}
      control={control}
      render={() => (
        <CustomFormControl
          label={label}
          sx={{
            width: '12rem',
          }}
        >
          <DatePicker
            {...datePickerProps}
            {...restField}
            name={name}
            slotProps={{
              textField: {
                size: 'small',
                // helperText: invalid && <ErrorMessage name={name} errors={errors} />,
                // error: invalid,
              },
            }}
            value={dateValue ?? defaultValue}
            onChange={(date) => {
              if (!date) {
                onChange(null);
                return;
              }

              onChange(convertDateToISOString(date));
              setDateValue(date);
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
