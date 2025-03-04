import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { RecordStatus, TaxPeriod, TimeBreakpoints } from '~shared/model/enum';
import { omitFalsy } from '~shared/model/helper/omitFalsy';
import { useTableRecordControls } from './useTableRecordControls';
import { convertBreakpointToTimeRange } from './convertBreakpointToTimeRange';

export interface IFilterBarForm {
  time_breakpoint: TimeBreakpoints | null;
  user_id: string;
  record_status: RecordStatus | null;
  tax_period: TaxPeriod | '';
  from: string;
  to: string;
}
type FormType = IFilterBarForm;

const defaultValues: FormType = {
  time_breakpoint: null,
  user_id: '',
  record_status: null,
  tax_period: '',
  from: '',
  to: '',
};

const getDefaultValues = (filters: string): FormType => ({
  ...defaultValues,
  ...(filters ? JSON.parse(filters) : {}),
});

export const useFilterBarForm = () => {
  const { tableSearchParams, handleFilters } = useTableRecordControls();
  const { filters } = tableSearchParams;

  const form = useForm<FormType>({ defaultValues: getDefaultValues(filters) });

  useEffect(() => {
    const { unsubscribe } = form.watch(
      ({ time_breakpoint: breakpoint = null, ...restValues }, { name }) => {
        const updatedValues =
          name === 'time_breakpoint'
            ? {
                ...restValues,
                ...convertBreakpointToTimeRange(breakpoint),
              }
            : restValues;

        handleFilters(omitFalsy(updatedValues));
      }
    );

    return () => unsubscribe();
  }, [form, handleFilters]);

  const handleReset = () => form.reset(defaultValues);

  return { form, onSetValue: form.setValue, onReset: handleReset };
};
