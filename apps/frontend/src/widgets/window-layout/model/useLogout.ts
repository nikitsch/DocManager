import { useNavigate } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RoutesPaths } from '~shared/model/enum';
import { useUserAuthStore } from '~entities/user-auth/model/useUserAuthStore';
import { logoutPost } from '../api/logoutPost';

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const clearUser = useUserAuthStore((state) => state.clearUser);

  return useMutation({
    mutationFn: logoutPost,
    onSuccess: () => {
      queryClient.clear();
      clearUser();
      navigate(`/${RoutesPaths.LOGIN}`, { replace: true });
    },
  });
};
