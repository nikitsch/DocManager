import { useNavigate } from 'react-router';
import { DEFAULT_REDIRECT_PARAM } from '~shared/model/constant';
import { RoutesPaths } from '~shared/model/enum';
import { useClearAppState } from '~shared/model/helper/useClearAppState';
import { useRedirectPath } from '~shared/model/helper/useRedirectPath';
import { ApiError } from '~shared/api/ApiError';

export const useApiErrorHandler = (error: ApiError | Error | null) => {
  const navigate = useNavigate();
  const { clearAll } = useClearAppState();
  const redirectPath = useRedirectPath();

  if (!error) return;

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

  // console.error(error);
};
