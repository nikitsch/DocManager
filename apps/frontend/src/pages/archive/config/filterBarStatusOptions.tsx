import { RecordStatusLabelMapper } from '~shared/model/constant';
import { RecordStatus } from '~shared/model/enum';
import { IFormToggleButtonProps } from '~shared/ui/form/toggle-button-group/toggle-button';
import { RecordStatusIconMapper } from '../lib/recordStatusMapper';

export const filterBarStatusOptions: Array<IFormToggleButtonProps> = [
  {
    value: RecordStatus.NEW,
    label: RecordStatusLabelMapper[RecordStatus.NEW],
    icon: RecordStatusIconMapper[RecordStatus.NEW],
  },
  {
    value: RecordStatus.IN_PROCESS,
    label: RecordStatusLabelMapper[RecordStatus.IN_PROCESS],
    icon: RecordStatusIconMapper[RecordStatus.IN_PROCESS],
  },
  {
    value: RecordStatus.REJECTED,
    label: RecordStatusLabelMapper[RecordStatus.REJECTED],
    icon: RecordStatusIconMapper[RecordStatus.REJECTED],
  },
  {
    value: RecordStatus.FINISHED,
    label: RecordStatusLabelMapper[RecordStatus.FINISHED],
    icon: RecordStatusIconMapper[RecordStatus.FINISHED],
  },
];
