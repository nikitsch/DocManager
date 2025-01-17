import { RecordStatus } from '../enums';

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

export const UNRECOGNIZED_FILE_EXTESION = 'unrecognized'; //TODO: move out to global
