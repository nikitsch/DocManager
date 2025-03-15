import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { RoutesPaths } from '~shared/model/enum';
import { useUserAuthStore } from '~entities/user-auth/model/useUserAuthStore';
import { postLogout } from '../api/postLogout';

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const clearUser = useUserAuthStore((state) => state.clearUser);

  return useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      queryClient.clear();
      clearUser();
      navigate(`/${RoutesPaths.LOGIN}`, { replace: true });
    },
  });
};
