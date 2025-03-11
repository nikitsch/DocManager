import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router';
import { RoutesPaths } from '~shared/model/enum';
import { CreateIcon } from '~shared/ui/custom-icons';

import type { FC } from 'react';
import { Tooltip } from '@mui/material';

const CreateRecordButton: FC = () => {
  const navigate = useNavigate();

  return (
    <Stack position="fixed" right={35} bottom={35}>
      <Fab
        aria-label="create-record"
        onClick={() => navigate(RoutesPaths.CREATE)}
        color="primary"
        sx={{ width: '60px', height: '60px' }}
      >
        <Tooltip title="Create record">
          <CreateIcon sx={{ fontSize: 30 }} />
        </Tooltip>
      </Fab>
    </Stack>
  );
};

export default CreateRecordButton;
