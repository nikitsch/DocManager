import Stack from '@mui/material/Stack';
import FilteringAndSearchingTableModule from './ui/FilteringAndSearchingTableModule';
import TableRecords from './ui/TableRecords';
import CreateRecordButton from './ui/CreateRecordButton';

import type { FC } from 'react';

const ArchivePage: FC = () => (
  <Stack gap={3}>
    <FilteringAndSearchingTableModule />

    <TableRecords />

    <CreateRecordButton />
  </Stack>
);

export default ArchivePage;
