import type { FC } from 'react';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { useRecords } from './model/useRecords';
import { useTableControls } from './model/useTableControls';

const columns: GridColDef[] = [
  { field: 'created_at', headerName: 'Date', width: 200 },
  { field: 'record_status', headerName: 'Status', width: 100 },
  { field: 'record_number', headerName: 'Record Number', width: 120 },
  { field: 'record_type', headerName: 'Record Type', width: 150 },
  { field: 'organization_name', headerName: 'Organization Name', width: 150 },
  { field: 'tax_period', headerName: 'Tax Period', width: 200 },
];

const ArchivePage: FC = () => {
  const { paginationModel, handlePagination, handleSort } = useTableControls();
  const { data, isLoading } = useRecords();

  return (
    <DataGrid
      rows={data?.data || []}
      columns={columns}
      loading={isLoading}
      getRowId={(row) => row.record_id}
      rowCount={data?.total || 0}
      pageSizeOptions={[10, 15, 25, 50, 100]}
      paginationMode="server"
      paginationModel={paginationModel}
      onPaginationModelChange={handlePagination}
      sortingMode="server"
      onSortModelChange={handleSort}
      onRowClick={
        ({ id }: GridRowParams) => console.log('onRowClick:', id)
        // handleOpenTdocDescription(id as string)
      }
      disableRowSelectionOnClick
      disableColumnMenu
      slotProps={{
        pagination: {
          labelRowsPerPage: 'Records per page',
        },
      }}
    />
  );
};

export default ArchivePage;
