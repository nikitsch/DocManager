import { useUserAuthStore } from '~entities/user-auth/model/useUserAuthStore';

export function useRole() {
  const user = useUserAuthStore((state) => state.user);

  return user?.role;
}
