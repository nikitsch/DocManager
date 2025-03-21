import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Form from '~shared/ui/form/form';
import FormSelect from '~shared/ui/form/select';
import FormTextField from '~shared/ui/form/text-field';
import FormAutocomplete from '~shared/ui/form/autocomplete';
import FormFileUploadField from '~shared/ui/form/file-upload-field';
import FilePanel from '~shared/ui/file-panel';
import FilesShowcase from '~shared/ui/files-showcase';
import { TaxPeriodLabelMapper } from '~shared/model/constant';
import { getSelectOptions } from '~shared/model/helper/getSelectOptions';
import { useCreateRecordForm } from '../model/useCreateRecordForm';
import { useRecordTypeOptions } from '../model/useRecordTypeOptions';

import type { FC } from 'react';

const ROW_SPACING = 2;

const CreateRecordPageForm: FC = () => {
  const {
    form,
    mutation: { isPending },
    isDisabled,
    files,
    filesError,
    onRemoveFile,
    onSubmit,
  } = useCreateRecordForm();

  const taxPeriodOptions = getSelectOptions(TaxPeriodLabelMapper, true);
  const [recordTypeOptions] = useRecordTypeOptions({
    refetchOnWindowFocus: true,
    refetchInterval: 60 * 1000, //* milliseconds
  });

  return (
    <Form form={form} onSubmit={onSubmit}>
      <Grid container rowSpacing={ROW_SPACING} columnSpacing={6}>
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          rowSpacing={ROW_SPACING}
          size={{ xs: 12, sm: 6 }}
        >
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
            minLength={3}
            maxLength={50}
          />
          <FormTextField
            name="record_subtype"
            label="Record subtype"
            minLength={3}
            maxLength={50}
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
        <Grid size={12}>
          <FilePanel count={files?.length || 0} error={filesError}>
            <FormFileUploadField name="files" required />
          </FilePanel>
        </Grid>
        <Grid size={12}>
          <FilesShowcase files={files} onRemoveFile={onRemoveFile} />
        </Grid>
      </Grid>
      <Stack mt={3} alignItems="flex-end">
        <Button
          type="submit"
          variant="contained"
          size="large"
          loading={isPending}
          sx={{ width: 150 }}
          disabled={isDisabled}
        >
          Create
        </Button>
      </Stack>
    </Form>
  );
};

export default CreateRecordPageForm;
