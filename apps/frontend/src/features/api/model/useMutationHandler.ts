import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { ApiError } from '~features/api/model/ApiError';
import { DEFAULT_REDIRECT_PARAM } from '~shared/model/constant';
import { RoutesPaths } from '~shared/model/enum';
import { useClearAppState } from '~shared/model/helper/useClearAppState';
import { useRedirectPath } from '~shared/model/helper/useRedirectPath';

import type { UseMutationOptions } from '@tanstack/react-query';

export const useMutationHandler = <T, V>(
  options: UseMutationOptions<T, ApiError, V, unknown>
) => {
  const { onSuccess, onError, ...restOptions } = options;

  const navigate = useNavigate();
  const { clearAll } = useClearAppState();
  const redirectPath = useRedirectPath();

  const handleSuccess = (data: T, variables: V, context: unknown) => {
    if (onSuccess) {
      onSuccess(data, variables, context);
    }
    console.log('Success Handler');
  };

  const handleError = (error: ApiError, variables: V, context: unknown) => {
    if (onError) {
      onError(error, variables, context);
    }
    if (error.statusCode === 401 && error.message.includes('Unauthorized')) {
      navigate(
        `/${RoutesPaths.LOGIN}?${DEFAULT_REDIRECT_PARAM}=${redirectPath}`,
        { replace: true }
      );
      setTimeout(() => clearAll(), 100);
      return;
    }
    console.log('Error Handler');
  };

  return useMutation({
    ...restOptions,
    onSuccess: handleSuccess,
    onError: handleError,
  });
};
