import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { useUserAuthStore } from '~entities/user-auth/model/useUserAuthStore';
import { RoutesPaths } from '~shared/model/enum';
import { MutationOptionsType } from '~shared/model/type';
import { postLogout } from '../api/postLogout';

export const useLogout = (
  mutationOptions: MutationOptionsType<unknown, { message: string }> = {}
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const clearUser = useUserAuthStore((state) => state.clearUser);

  return useMutation({
    ...mutationOptions,
    mutationFn: postLogout,
    onSuccess: () => {
      queryClient.clear();
      clearUser();
      navigate(`/${RoutesPaths.LOGIN}`, { replace: true });
    },
  });
};
