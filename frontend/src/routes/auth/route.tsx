import VerifyOTP from '@/components/custom/signup/VerifyOTP';
import Details from '@/components/custom/signup/Details';
import { createFileRoute } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'motion/react';
import Phone from '@/components/custom/signup/Phone';
import { useUserStore } from '@/stores/user-store';

export const Route = createFileRoute('/auth')({
  component: AuthComponent,
});

function AuthComponent() {
  const page = useUserStore((state) => state.pageCount);
  const componentsToDisplay = [<Details />, <Phone />, <VerifyOTP />];
  return (
    <div className='w-full flex h-dvh items-center justify-center p-10'>
      <AnimatePresence mode='wait'>
        <motion.div
          key={`_${page}`}
          className='h-full'
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -500, opacity: 0 }}
          transition={{
            duration: 0.4,
            bounce: 0.35,
            type: 'spring',
          }}>
          {componentsToDisplay[page]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
