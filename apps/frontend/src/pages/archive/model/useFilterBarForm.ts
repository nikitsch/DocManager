import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { RecordStatus } from '~shared/model/enum';
import { useTableRecordControls } from './useTableRecordControls';

export interface IFilterBarForm {
  user_id?: string;
  record_status?: RecordStatus;
  // tax_period?: TaxPeriod;
  // from?: string;
  // to?: string;
}
type FormType = IFilterBarForm;

const getClearedObject = (obj: Record<string, string>) => {
  const clearedObj = Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => Boolean(value))
  );
  return Object.keys(clearedObj).length ? clearedObj : undefined;
};

export const useFilterBarForm = () => {
  const form = useForm<FormType>();

  const { handleFilter } = useTableRecordControls();

  const handleSubmit = (filterData: FormType) => console.log(filterData);

  useEffect(() => {
    const subscription = form.watch((values, { name }) => {
      if (name) {
        console.log(`Изменилось поле: ${name}`, values[name]);
      }
      handleFilter(getClearedObject(values));
    });

    return () => subscription.unsubscribe();
  }, [form, handleFilter]);

  // const handleChange = (event: ChangeEvent<HTMLFormElement>) => {
  //   const fieldName = event.target.name;
  //   // console.log(`Изменилось поле: ${fieldName}`);
  //   const values = form.getValues();
  //   handleFilter(JSON.stringify(values));
  // };

  return { form, onSubmit: handleSubmit };
};
