import { useForm } from 'react-hook-form';
import Form from '~shared/ui/form/form';
import FormSearchField from '~shared/ui/form/search-field';
import { useTableRecordControls } from '../model/useTableRecordControls';

import type { FC } from 'react';

export type FormType = {
  search: string;
};

const SearchPanel: FC = () => {
  const { tableSearchParams, handleSearch } = useTableRecordControls();
  const { search } = tableSearchParams;
  const form = useForm<FormType>({ defaultValues: { search } });

  const handleSubmit = (values: FormType) => handleSearch(values.search);
  const handleClear = () => handleSearch('');

  return (
    <Form<FormType> form={form} onSubmit={handleSubmit}>
      <FormSearchField placeholder="Search" onClickClear={handleClear} />
    </Form>
  );
};

export default SearchPanel;
