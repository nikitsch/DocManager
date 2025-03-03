import { format } from 'date-fns';
import { GridColDef } from '@mui/x-data-grid';
import {
  DEFAULT_DATE_FORMAT,
  TaxPeriodLabelMapper,
} from '~shared/model/constant';
import { TaxPeriod } from '~shared/model/enum';
import RecordStatusCell from '../ui/RecordStatusCell';
import RefreshTableHeaderCell from '../ui/RefreshTableHeaderCell';

export const recordTableColumns: GridColDef[] = [
  {
    field: 'created_at',
    headerName: 'Date',
    flex: 1,
    valueGetter: (_, row) =>
      format(new Date(row.created_at), DEFAULT_DATE_FORMAT),
  },
  {
    field: 'record_status',
    headerName: 'Status',
    flex: 0.7,
    renderCell: RecordStatusCell,
  },
  { field: 'record_number', headerName: 'Record number', flex: 1 },
  {
    field: 'record_type_entity',
    headerName: 'Record type',
    flex: 2,
    sortable: false,
    valueGetter: (_, row) => row.record_type_entity.type,
  },
  {
    field: 'organization_name',
    headerName: 'Organization name',
    flex: 2,
    sortable: false,
  },
  {
    field: 'tax_period',
    headerName: 'Tax period',
    flex: 1,
    valueGetter: (_, row) => TaxPeriodLabelMapper[row.tax_period as TaxPeriod],
  },
  {
    field: 'refresh', //* This field doesn't exist in the Record object.
    headerName: 'Refresh',
    headerAlign: 'center',
    flex: 1,
    sortable: false,
    resizable: false,
    renderHeader: RefreshTableHeaderCell,
  },
];
