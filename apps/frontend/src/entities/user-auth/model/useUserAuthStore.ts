import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { IUserAuthResponse } from '~shared/model/interface';

interface IUserAuthState {
  user: IUserAuthResponse | null;
  setUser: (user: IUserAuthResponse) => void;
  clearUser: () => void;
}

const LS_USER_AUTH_KEY = 'LS_USER_AUTH_KEY';

export const useUserAuthStore = create(
  persist<IUserAuthState>(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => {
        set({ user: null });
        localStorage.removeItem(LS_USER_AUTH_KEY);
      },
    }),
    {
      name: LS_USER_AUTH_KEY,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
