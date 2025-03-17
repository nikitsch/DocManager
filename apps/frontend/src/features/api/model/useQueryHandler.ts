import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { DEFAULT_REDIRECT_PARAM } from '~shared/model/constant';
import { RoutesPaths } from '~shared/model/enum';
import { useClearAppState } from '~shared/model/helper/useClearAppState';
import { useRedirectPath } from '~shared/model/helper/useRedirectPath';
import { ApiError } from '~shared/api/ApiError';

import type { QueryKey, UseQueryOptions } from '@tanstack/react-query';

export const useQueryHandler = <T>(
  options: UseQueryOptions<T, Error | ApiError, T, QueryKey>
) => {
  const navigate = useNavigate();
  const { clearAll } = useClearAppState();
  const redirectPath = useRedirectPath();

  const { error, ...restQuery } = useQuery(options);

  if (
    error instanceof ApiError &&
    error.statusCode === 401 &&
    error.message.includes('Unauthorized')
  ) {
    clearAll();
    navigate(
      `/${RoutesPaths.LOGIN}?${DEFAULT_REDIRECT_PARAM}=${redirectPath}`,
      { replace: true }
    );
  }

  // console.error(error); //Notistack

  return { error, ...restQuery };
};
