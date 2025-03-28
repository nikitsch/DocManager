import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import { format } from 'date-fns';
import { useWatch } from 'react-hook-form';
import PageLoader from '~shared/ui/page-loader';
import Form from '~shared/ui/form/form';
import FormTextField from '~shared/ui/form/text-field';
import {
  DEFAULT_DATE_TIME_FORMAT,
  TaxPeriodLabelMapper,
} from '~shared/model/constant';
import { RecordStatus, TaxPeriod } from '~shared/model/enum';
import { IRecordTypeEntity } from '~shared/model/interface';
import StatusDateField from './StatusDateField';
import { RecordViewForm, useRecordViewForm } from '../model/useRecordViewForm';

import type { FC } from 'react';

const RecordViewPageForm: FC = () => {
  const {
    form,
    query: { isLoading, isRefetching },
  } = useRecordViewForm();

  const [record_status, reason_for_rejection] = useWatch<
    RecordViewForm,
    ['record_status', 'reason_for_rejection']
  >({
    control: form.control,
    name: ['record_status', 'reason_for_rejection'],
  });

  if (isLoading) return <PageLoader />;

  const size = { xs: 12, sm: 6 };

  return (
    <Form form={form}>
      {record_status && <StatusDateField status={record_status} />}

      <Grid container rowSpacing={3} columnSpacing={6}>
        {reason_for_rejection && (
          <Grid size={12}>
            <FormTextField
              name="reason_for_rejection"
              label="Reason for rejection"
              variant="standard"
              multiline
              readOnly
            />
          </Grid>
        )}

        <Grid size={size}>
          <FormTextField
            name="organization_name"
            label="Organization name"
            variant="standard"
            multiline
            readOnly
          />
        </Grid>

        <Grid size={size}>
          <FormTextField
            name="record_number"
            label="Record number"
            variant="standard"
            multiline
            readOnly
          />
        </Grid>

        <Grid size={size}>
          <FormTextField
            name="created_at"
            label="Date of recording"
            variant="standard"
            transformValue={(value: string) =>
              value ? format(new Date(value), DEFAULT_DATE_TIME_FORMAT) : ''
            }
            multiline
            readOnly
          />
        </Grid>

        <Grid size={size}>
          <FormTextField
            name="tax_period"
            label="Tax period"
            variant="standard"
            transformValue={(value: TaxPeriod) => TaxPeriodLabelMapper[value]}
            multiline
            readOnly
          />
        </Grid>

        <Grid size={size}>
          <FormTextField
            name="record_type_entity"
            label="Type"
            variant="standard"
            transformValue={(value: IRecordTypeEntity) =>
              value?.type ? value.type : ''
            }
            multiline
            readOnly
          />
        </Grid>

        <Grid size={size}>
          <FormTextField
            name="record_subtype"
            label="Subtype"
            variant="standard"
            multiline
            readOnly
          />
        </Grid>

        <Grid size={12}>
          <FormTextField
            name="record_comment"
            label="Comment"
            variant="standard"
            multiline
            readOnly
          />
        </Grid>
      </Grid>

      {record_status === RecordStatus.NEW && (
        <Stack mt={3} alignItems="flex-end">
          <Button
            variant="contained"
            size="large"
            sx={{ width: 150 }}
            loading={isRefetching}
          >
            Edit
          </Button>
        </Stack>
      )}
    </Form>
  );
};

export default RecordViewPageForm;
