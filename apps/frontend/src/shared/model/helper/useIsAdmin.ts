import { UserRole } from "~shared/model/enum";
import { useRole } from "./useRole";

export function useIsAdmin() {
  const role = useRole();

  return role === UserRole.ADMIN;
}
