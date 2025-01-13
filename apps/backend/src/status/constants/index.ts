import { RecordStatus } from '../../types';

export const statusTransitions: Record<RecordStatus, RecordStatus[]> = {
  [RecordStatus.NEW]: [
    RecordStatus.IN_PROCESS,
    RecordStatus.FINISHED,
    RecordStatus.REJECTED,
  ],
  [RecordStatus.IN_PROCESS]: [RecordStatus.FINISHED, RecordStatus.REJECTED],
  [RecordStatus.FINISHED]: [],
  [RecordStatus.REJECTED]: [],
};
