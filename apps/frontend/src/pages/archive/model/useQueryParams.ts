import { useSearchParams } from 'react-router';
import { convertISOStringToDate } from '~shared/model/dates';
import { TABLE_CONTROLS } from './useTableRecordControls';
import { IFilterBarForm } from './useFilterBarForm';

const convertDateFilterToUTC = (value: string) => {
  const filters = JSON.parse(value) as Partial<IFilterBarForm>;

  return JSON.stringify({
    ...filters,
    from: filters.from
      ? convertISOStringToDate(filters.from)?.toISOString()
      : undefined,
    to: filters.to
      ? convertISOStringToDate(filters.to)?.toISOString()
      : undefined,
  });
};

export function useQueryParams(): {
  queryKeys: Array<string>;
  queryString: string;
} {
  const [searchParams] = useSearchParams();

  const queryKeys = Array.from(searchParams.entries())
    .filter(Boolean)
    .map(([key, value]) => {
      if (key === TABLE_CONTROLS.FILTERS) {
        return `${key}=${convertDateFilterToUTC(value)}`;
      }
      return `${key}=${value}`;
    });

  return {
    queryKeys,
    queryString: queryKeys.join('&'),
  };
}
