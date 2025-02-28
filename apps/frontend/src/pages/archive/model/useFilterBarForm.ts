import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { RecordStatus, TaxPeriod, TimeBreakpoints } from '~shared/model/enum';
import { useTableRecordControls } from './useTableRecordControls';

export interface IFilterBarForm {
  time_breakpoints?: TimeBreakpoints | null;
  user_id?: string;
  record_status?: RecordStatus | null;
  tax_period?: TaxPeriod | '';
  from?: string;
  to?: string;
}
type FormType = IFilterBarForm;

const defaultValues: FormType = {
  time_breakpoints: null,
  user_id: '',
  record_status: null,
  tax_period: '',
  from: '',
  to: '',
};

const getClearedObject = (obj: Record<string, string | null | undefined>) => {
  const clearedObj = Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => Boolean(value))
  ) as Record<string, string>;

  return Object.keys(clearedObj).length ? clearedObj : undefined;
};

const getDefaultValues = (filters: string): FormType => {
  const filterParams = filters ? JSON.parse(filters) : {};

  return Object.fromEntries(
    Object.entries(defaultValues).map(([key, value]) => [
      key,
      filterParams[key] || value,
    ])
  );
};

export const useFilterBarForm = () => {
  const { tableSearchParams, handleFilters } = useTableRecordControls();
  const { filters } = tableSearchParams;

  const form = useForm<FormType>({ defaultValues: getDefaultValues(filters) });

  useEffect(() => {
    const subscription = form.watch((values, { name }) => {
      if (name) {
        console.log(`Изменилось поле: ${name}`, values[name]);
      }
      handleFilters(getClearedObject(values));
    });

    return () => subscription.unsubscribe();
  }, [form, handleFilters]);

  const handleReset = () => form.reset(defaultValues);

  return { form, onReset: handleReset };
};
