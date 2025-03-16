import { useQueryClient } from '@tanstack/react-query';
import { useUserAuthStore } from '~entities/user-auth/model/useUserAuthStore';

export const useClearAppState = () => {
  const queryClient = useQueryClient();
  const clearUser = useUserAuthStore((state) => state.clearUser);

  return {
    clearCache: () => queryClient.clear(),
    clearUserState: () => clearUser(),
    clearAll: () => {
      queryClient.clear();
      clearUser();
    },
  };
};
