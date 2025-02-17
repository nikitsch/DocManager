import { GridColDef } from '@mui/x-data-grid';

export const recordTableColumns: GridColDef[] = [
  { field: 'created_at', headerName: 'Date', width: 200 },
  { field: 'record_status', headerName: 'Status', width: 100 },
  { field: 'record_number', headerName: 'Record Number', width: 150 },
  { field: 'record_type', headerName: 'Record Type', width: 150 },
  {
    field: 'organization_name',
    headerName: 'Organization Name',
    width: 180,
    sortable: false,
  },
  { field: 'tax_period', headerName: 'Tax Period', width: 200 },
];
