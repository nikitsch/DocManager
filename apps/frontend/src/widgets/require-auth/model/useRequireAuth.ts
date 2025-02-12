import { useQuery } from '@tanstack/react-query';
import { checkAuth } from '../api/checkAuth';

export const useRequireAuth = () => {
  return useQuery({
    queryFn: checkAuth,
    queryKey: ['checkAuth'],
    retry: () => false,
  });
};
