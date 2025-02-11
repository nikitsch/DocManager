import { create } from 'zustand';
import { UserRole } from '~shared/model/enum';

interface IUserAuthData {
  userid: number;
  username: string;
  role: UserRole;
}

interface IUserAuthState {
  user: IUserAuthData | null;
  setUser: (user: IUserAuthData) => void;
  clearUser: () => void;
}

export const useUserAuthStore = create<IUserAuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
