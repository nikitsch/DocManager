import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router';
import { RoutesPaths } from '~shared/model/enum';
import { CreateIcon } from '~shared/ui/custom-icons';

import type { FC } from 'react';

const CreateRecordButton: FC = () => {
  const navigate = useNavigate();

  return (
    <Stack position="fixed" right={35} bottom={35}>
      <Tooltip title="Create record">
        <Fab
          aria-label="create-record"
          onClick={() => navigate(RoutesPaths.CREATE)}
          color="primary"
          sx={{ width: '60px', height: '60px' }}
        >
          <CreateIcon sx={{ fontSize: 30 }} />
        </Fab>
      </Tooltip>
    </Stack>
  );
};

export default CreateRecordButton;
