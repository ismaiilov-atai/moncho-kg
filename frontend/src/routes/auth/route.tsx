import { createFileRoute } from '@tanstack/react-router';
import Details from '@/components/custom/Details';
import Phone from '@/components/custom/Phone';
import VerifyOTP from '@/components/custom/VerifyOTP';
import { create } from 'zustand';
export const Route = createFileRoute('/auth')({
  component: AuthComponent,
});

interface AuthState {
  name: string;
  lastName: string;
  phoneNumber: string;
  pageCount: number;
}
type AuthActions = {
  updateFirstName: (name: AuthState['name']) => void;
  updateLastName: (lastName: AuthState['lastName']) => void;
  updatePhoneNumber: (phoneNumber: AuthState['phoneNumber']) => void;
  forwardAuthPage: (pageCount: AuthState['pageCount']) => void;
  backwardsAuthPage: (pageCount: AuthState['pageCount']) => void;
};

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

function AuthComponent() {
  const page = useAuthStore((state) => state.pageCount);
  const componentsToDisplay = [<Details />, <Phone />, <VerifyOTP />];
  return (
    <div className=' flex h-dvh items-center justify-center'>
      {componentsToDisplay[page]}
    </div>
  );
}
