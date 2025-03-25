import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { IPostRecord } from '~pages/create/api/postRecord';

interface IAuthUserId {
  auth_user_id: number | null;
}

interface IFormState {
  formCreate: (IPostRecord & IAuthUserId) | null;
  setFormCreate: (formCreate: IPostRecord & IAuthUserId) => void;
  clearFormCreate: () => void;
}

const SESSION_STORAGE_FORM_KEY = 'SESSION_STORAGE_FORM_KEY';

export const useFormStore = create(
  persist<IFormState>(
    (set) => ({
      formCreate: null,
      setFormCreate: (formCreate) => set({ formCreate }),
      clearFormCreate: () => {
        set({ formCreate: null });
        sessionStorage.removeItem(SESSION_STORAGE_FORM_KEY);
      },
    }),
    {
      name: SESSION_STORAGE_FORM_KEY,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
