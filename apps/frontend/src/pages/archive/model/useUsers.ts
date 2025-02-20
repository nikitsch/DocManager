import { useQuery } from '@tanstack/react-query';
import { useIsAdmin } from '~shared/model/helper/useIsAdmin';
import { getUsers } from '../api/getUsers';

export function useUsers() {
  const isAdmin = useIsAdmin();

  return useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(),
    enabled: isAdmin,
  });
}
