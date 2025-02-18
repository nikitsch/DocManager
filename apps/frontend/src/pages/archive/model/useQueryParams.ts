import { useSearchParams } from 'react-router';

export function useQueryParams(): {
  queryKeys: Array<string>;
  queryString: string;
} {
  const [searchParams] = useSearchParams();

  const queryKeys = Array.from(searchParams.entries())
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}=${value}`);
  // console.log({ queryKeys, queryString: queryKeys.join('&') });

  return {
    queryKeys,
    queryString: queryKeys.join('&'),
  };
}
