import { useNavigate } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RoutesPaths } from '~shared/enum/Routes';
import { logoutPost } from '../api/logoutPost';

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logoutPost,
    onSuccess: () => {
      queryClient.clear();
      navigate(`/${RoutesPaths.LOGIN}`, { replace: true });
    },
  });
};
