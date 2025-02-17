import { useForm } from 'react-hook-form';
import Form from '~shared/ui/form/form';
import FormSearchField from '~shared/ui/form/search-field';
import { useTableRecordControls } from '../model/useTableRecordControls';

import type { FC } from 'react';

export type FormType = {
  search: string;
};

const SearchPanel: FC = () => {
  const form = useForm<FormType>();
  const { handleSearch } = useTableRecordControls();

  const handleSubmit = (values: FormType) => handleSearch(values.search);
  const handleClear = () => handleSearch('');

  return (
    <Form<FormType> form={form} onSubmit={handleSubmit}>
      <FormSearchField
        // defaultValue={tableSearchParams.search}
        placeholder="Search"
        onClickClear={handleClear}
      />
    </Form>
  );
};

export default SearchPanel;
