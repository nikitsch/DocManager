import { useNavigate, useParams } from 'react-router';
import { useQueryHandler } from '~features/api/model/useQueryHandler';
import { IRecord } from '~shared/model/interface';
import { QueryOptionsType } from '~shared/model/type';
import { getRecordById } from '../api/getRecordById';
import { RoutesPaths } from '~shared/model/enum';

type TData = IRecord;

export function useRecordById(queryOptions: QueryOptionsType<TData> = {}) {
  const navigate = useNavigate();
  const { id = '0' } = useParams();
  const queryKey = [`record_${id}`];

  const { error, ...restQuery } = useQueryHandler<TData>({
    ...queryOptions,
    queryKey,
    queryFn: () => getRecordById(id),
  });

  //* 403 - Forbidden / The record doesn't belong to the user
  //* 404 - Not Found / There is no record with this ID.
  if (error && 'statusCode' in error && [403, 404].includes(error.statusCode)) {
    navigate(`/${RoutesPaths.ALL}`, { replace: true }); //TODO: come up with a placeholder for pages with entries that are closed to access instead of the <NotFound /> page
  }

  return { error, ...restQuery };
}
