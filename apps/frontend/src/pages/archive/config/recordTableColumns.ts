import { GridColDef } from '@mui/x-data-grid';
import { TaxPeriodLabelMapper } from '~shared/model/constant';
import { TaxPeriod } from '~shared/model/enum';
import RecordStatusCell from '../ui/RecordStatusCell';

export const recordTableColumns: GridColDef[] = [
  { field: 'created_at', headerName: 'Date', flex: 1.5 },
  {
    field: 'record_status',
    headerName: 'Status',
    flex: 1,
    renderCell: RecordStatusCell,
  },
  { field: 'record_number', headerName: 'Record number', flex: 1.5 },
  {
    field: 'record_type_entity',
    headerName: 'Record type',
    flex: 1.5,
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
];
