import { AuthActions, AuthState } from '@/types/auth-types';
import { create } from 'zustand/react';

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  name: '',
  lastName: '',
  phoneNumber: '',
  pageCount: 0,
  updateFirstName: (name) => set(() => ({ name })),
  updateLastName: (lastName) => set(() => ({ lastName })),
  updatePhoneNumber: (phoneNumber) => set(() => ({ phoneNumber })),
  forwardAuthPage: (authPage) => set(() => ({ pageCount: authPage + 1 })),
  backwardsAuthPage: (authPage) => set(() => ({ pageCount: authPage - 1 })),
}));
