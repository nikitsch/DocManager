import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import { useNavigate } from 'react-router';
import { useTableRecordControls } from '../model/useTableRecordControls';
import { useRecords } from '../model/useRecords';
import { recordTableColumns } from '../config/recordTableColumns';

import type { FC } from 'react';

const TableRecords: FC = () => {
  const { paginationModel, sortModel, handlePagination, handleSort } =
    useTableRecordControls();
  const { data, isLoading } = useRecords();

  const navigate = useNavigate();
  const handleRowClick = ({ id }: GridRowParams) => navigate(String(id));

  return (
    <DataGrid
      rows={data?.data || []}
      columns={recordTableColumns}
      loading={isLoading}
      getRowId={(row) => row.record_id}
      rowCount={data?.total || 0}
      pageSizeOptions={[10, 15, 25, 50, 100]}
      paginationMode="server"
      paginationModel={paginationModel}
      onPaginationModelChange={handlePagination}
      sortingMode="server"
      sortModel={sortModel}
      onSortModelChange={handleSort}
      onRowClick={handleRowClick}
      disableRowSelectionOnClick
      disableColumnMenu
      slotProps={{
        pagination: {
          labelRowsPerPage: 'Records per page',
          sx: {
            display: 'flex',
            justifyContent: 'flex-start',

            '& .MuiToolbar-root': {
              paddingLeft: '10px',
            },
          },
        },
      }}
    />
  );
};

export default TableRecords;
