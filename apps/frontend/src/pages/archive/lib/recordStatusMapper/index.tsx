import { RecordStatusLabelMapper } from '~shared/model/constant';
import { RecordStatus } from '~shared/model/enum';
import { getSelectOptions } from '~shared/model/helper/getSelectOptions';
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

export const recordStatusOptions = getSelectOptions(
  RecordStatusLabelMapper,
  true
).map(({ value, ...rest }) => ({
  ...rest,
  value,
  icon: RecordStatusIconMapper[value as keyof typeof RecordStatusIconMapper],
}));
