import SigninAnimatePresence from '@/components/custom/signup/SigninAnimatePresence';
import VerifyOTP from '@/components/custom/signup/VerifyOTP';
import { createFileRoute } from '@tanstack/react-router';
import Phone from '@/components/custom/signup/Phone';
import { useAuthStore } from '@/stores/signup-store';
import { wrap } from 'motion/react';

export const Route = createFileRoute('/login')({
  component: RouteComponent,
});

function RouteComponent() {
  const { authPageCount } = useAuthStore((state) => state);
  const componentsToDisplay = [<Phone isLogin />, <VerifyOTP />];
  const componentIndex = wrap(0, componentsToDisplay.length, authPageCount);

  return (
    <div className='w-full flex max-md:flex-col h-[80dvh] items-center max-sm:relative gap-4 max-md:justify-between justify-center px-10 py-4 max-sm:p-0 m-0'>
      <SigninAnimatePresence>
        {componentsToDisplay[componentIndex]}
      </SigninAnimatePresence>
    </div>
  );
}
