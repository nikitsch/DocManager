import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { RoutesPaths } from '~shared/model/enum';
import { MutationOptionsType } from '~shared/model/type';
import { useClearAppState } from '~shared/model/helper/useClearAppState';
import { postLogout } from '../api/postLogout';

export const useLogout = (
  mutationOptions: MutationOptionsType<unknown, { message: string }> = {}
) => {
  const navigate = useNavigate();
  const { clearAll } = useClearAppState();

  return useMutation({
    ...mutationOptions,
    mutationFn: postLogout,
    onSuccess: () => {
      clearAll();
      navigate(`/${RoutesPaths.LOGIN}`, { replace: true });
    },
  });
};
