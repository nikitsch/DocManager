import { RecordStatus } from '~shared/model/enum';
import {
  NewStatusIcon,
  InProcessStatusIcon,
  RejectedStatusIcon,
  FinishedStatusIcon,
} from '~shared/ui/custom-icons';

export const RecordStatusIconMapper = {
  [RecordStatus.NEW]: <NewStatusIcon />,
  [RecordStatus.IN_PROCESS]: <InProcessStatusIcon />,
  [RecordStatus.REJECTED]: <RejectedStatusIcon />,
  [RecordStatus.FINISHED]: <FinishedStatusIcon />,
};
