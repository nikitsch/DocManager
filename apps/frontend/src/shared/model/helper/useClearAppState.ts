import { useQueryClient } from '@tanstack/react-query';
import { useFormStore } from '~entities/form/model/useFormStore';
import { useUserAuthStore } from '~entities/user-auth/model/useUserAuthStore';

export const useClearAppState = () => {
  const queryClient = useQueryClient();
  const clearFormCreate = useFormStore((state) => state.clearFormCreate);
  const clearUser = useUserAuthStore((state) => state.clearUser);

  return {
    clearCache: () => queryClient.clear(),
    clearFormCreateState: () => clearFormCreate(),
    clearUserState: () => clearUser(),
    clearAll: () => {
      queryClient.clear();
      clearFormCreate();
      clearUser();
    },
  };
};
