import { RecordStatus } from '~shared/model/enum';
import {
  NewStatusIcon,
  InProcessStatusIcon,
  RejectedStatusIcon,
  FinishedStatusIcon,
} from '~shared/ui/CustomIcons';

export const RecordStatusIconMapper = {
  [RecordStatus.NEW]: <NewStatusIcon />,
  [RecordStatus.IN_PROCESS]: <InProcessStatusIcon />,
  [RecordStatus.REJECTED]: <RejectedStatusIcon />,
  [RecordStatus.FINISHED]: <FinishedStatusIcon />,
};
