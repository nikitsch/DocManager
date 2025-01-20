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

export const ERROR_MESSAGES = {
  MESSAGE_AN_AUTHORSHIP_ERROR: `This user doesn't have such an record`,
  NO_TOKEN_PROVIDED: 'Access denied: No token provided',
  FORBIDDEN_RESOURCE: 'Forbidden resource',
  STATUS_DOESNT_ALLOW_CHANGES: `The status of the record doesn't allow changes to be made to it`,
  NOTHING_TO_UPDATE: 'Nothing to update',
  UPDATE_NOT_ALLOWED: 'Update not allowed',
  REASON_FOR_REFUSAL_NOT_SPECIFIED: 'No reason for rejection was given',
  USERNAME_TAKEN: 'Username is already taken',
  INVALID_JSON: 'Invalid JSON string',
  MISSING_FIELD: 'Missing required field',
  RECORD_COMMENT_LENGTH:
    'Comment must be a string between 5 and 255 characters',
  INVALID_CREDENTIALS: 'Invalid credentials',
};
