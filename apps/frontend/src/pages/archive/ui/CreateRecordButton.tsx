import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router';
import { RoutesPaths } from '~shared/model/enum';

import type { FC } from 'react';
import { CreateIcon } from '~shared/ui/custom-icons';

const CreateRecordButton: FC = () => {
  const navigate = useNavigate();

  return (
    <Stack position="fixed" right={35} bottom={35}>
      <Fab
        color="primary"
        aria-label="create-record"
        onClick={() => navigate(RoutesPaths.CREATE)}
        sx={{ width: '60px', height: '60px' }}
      >
        <CreateIcon color="error" sx={{ fontSize: 30 }} />
      </Fab>
    </Stack>
  );
};

export default CreateRecordButton;
