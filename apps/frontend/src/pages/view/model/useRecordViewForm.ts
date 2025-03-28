import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { RecordStatus } from '~shared/model/enum';
import { IRecord } from '~shared/model/interface';
import { QueryOptionsType } from '~shared/model/type';
import { useRecordById } from './useRecordById';

export type RecordViewForm = Omit<
  IRecord,
  'record_id' | 'user_id' | 'record_direction' | 'record_files'
>;
type FormType = RecordViewForm;

export const useRecordViewForm = (
  queryOptions: QueryOptionsType<IRecord> = {}
) => {
  const { data: record, ...restQuery } = useRecordById({
    ...queryOptions,
    refetchInterval: (query) => {
      const currentStatus = query.state.data?.record_status;
      if (
        currentStatus === RecordStatus.FINISHED ||
        currentStatus === RecordStatus.REJECTED
      ) {
        return false;
      }

      return 60 * 1000; //* milliseconds
    },
  });

  const {
    record_id,
    user_id,
    record_direction,
    record_files,
    ...restRecordValues
  } = record || {};

  const form = useForm<FormType>();

  useEffect(() => {
    if (record) {
      form.reset(restRecordValues);
    }
    // eslint-disable-next-line
  }, [form, record]);

  return {
    form,
    query: { ...restQuery, data: record },
  };
};
