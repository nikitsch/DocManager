import { format } from 'date-fns';
import { IRecord } from '~shared/model/interface';
import { DEFAULT_DATE_TIME_FORMAT } from '~shared/model/constant';

export const getLastModifiedDate = ({
  created_at,
  updated_at,
  in_process_at,
  rejected_at,
  finished_at,
}: Pick<
  IRecord,
  'created_at' | 'updated_at' | 'in_process_at' | 'rejected_at' | 'finished_at'
>) => {
  const value =
    finished_at ||
    rejected_at ||
    in_process_at ||
    (updated_at?.length ? updated_at[updated_at.length - 1] : created_at);

  return value ? format(new Date(value), DEFAULT_DATE_TIME_FORMAT) : '';
};
