import { createFileRoute } from '@tanstack/react-router';
import Details from '@/components/custom/Details';
import Phone from '@/components/custom/Phone';
import VerifyOTP from '@/components/custom/VerifyOTP';
import { useAuthStore } from '@/stores/auth-store';

export const Route = createFileRoute('/auth')({
  component: AuthComponent,
});

function AuthComponent() {
  const page = useAuthStore((state) => state.pageCount);
  const componentsToDisplay = [<Details />, <Phone />, <VerifyOTP />];
  return (
    <div className=' flex h-dvh items-center justify-center'>
      {componentsToDisplay[page]}
    </div>
  );
}
