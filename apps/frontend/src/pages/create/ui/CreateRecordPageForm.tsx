import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import { useForm } from 'react-hook-form';
import Form from '~shared/ui/form/form';
import FormSelect from '~shared/ui/form/select';
import FormTextField from '~shared/ui/form/text-field';
import FormAutocomplete from '~shared/ui/form/autocomplete';
import { TaxPeriodLabelMapper } from '~shared/model/constant';
import { TaxPeriod } from '~shared/model/enum';
import { SelectOption } from '~shared/model/type';
import { getSelectOptions } from '~shared/model/helper/getSelectOptions';
import { useRecordTypeOptions } from '../model/useRecordTypeOptions';

import type { FC } from 'react';

export interface ICreateForm {
  tax_period: TaxPeriod | '';
  record_type: string | SelectOption | null;
  record_subtype?: string;
  record_comment: string;
  // files: string;
}
type FormType = ICreateForm;

const defaultValues: FormType = {
  tax_period: '',
  record_type: null,
  record_subtype: '',
  record_comment: '',
  // files: string;
};

const CreateRecordPageForm: FC = () => {
  const form = useForm<FormType>({ defaultValues });
  const watch = form.watch();
  console.log({ watch });

  const taxPeriodOptions = getSelectOptions(TaxPeriodLabelMapper, true);
  const [recordTypeOptions] = useRecordTypeOptions();

  return (
    <Form form={form}>
      <Grid container columnSpacing={8} rowSpacing={2}>
        <Grid container size={{ xs: 12, sm: 6 }} rowSpacing={2} direction='column' justifyContent='space-between'>
          <FormSelect
            name="tax_period"
            label="Tax period"
            options={taxPeriodOptions}
            required
          />
          <FormAutocomplete
            name="record_type"
            label="Record type"
            options={recordTypeOptions}
            required
            freeSolo
            disableClearable
            //TODO: minLength={5}
            //TODO: maxLength={255}
          />
          <FormTextField
            name="record_subtype"
            label="Record subtype"
            //TODO: minLength={5}
            //TODO: maxLength={255}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormTextField
            name="record_comment"
            label="Record comment"
            minLength={5}
            maxLength={255}
            rows={9}
            required
            multiline
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        variant="contained"
        size="large"
        // loading={isPending}
      >
        Create
      </Button>
    </Form>
  );
};

export default CreateRecordPageForm;
