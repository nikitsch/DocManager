import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { RoutesPaths } from '~shared/model/enum';
import { MutationOptionsType } from '~shared/model/type';
import { useClearAppState } from '~shared/model/helper/useClearAppState';
import { postLogout } from '../api/postLogout';

export const useLogout = (
  mutationOptions: MutationOptionsType<{ message: string }> = {}
) => {
  const navigate = useNavigate();
  const { clearAll } = useClearAppState();

  return useMutation({
    ...mutationOptions,
    mutationFn: postLogout,
    onSuccess: () => {
      navigate(`/${RoutesPaths.LOGIN}`, { replace: true });
      setTimeout(() => clearAll(), 100);
    },
  });
};
