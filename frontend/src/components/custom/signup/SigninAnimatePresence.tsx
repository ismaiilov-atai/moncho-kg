import { AnimatePresence, motion } from 'motion/react';
import { useAuthStore } from '@/stores/signup-store';
import { VARIANTS } from '@/lib/constants';
import { ReactNode } from 'react';

interface PageProps {
  children: ReactNode;
}

const SigninAnimatePresence = ({ children }: PageProps) => {
  const { authPageCount, isComingBack } = useAuthStore((state) => state);
  return (
    <AnimatePresence mode='wait' custom={isComingBack}>
      <motion.div
        key={`_${authPageCount}`}
        className='h-full w-full max-sm:m-0 max-sm:p-0 max-sm:pt-10 max-md:mt-8'
        variants={VARIANTS}
        initial='enter'
        exit='exit'
        animate={{ x: 0, opacity: 1 }}
        custom={isComingBack}
        transition={{
          duration: 0.4,
          bounce: 0.35,
          type: 'spring',
        }}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default SigninAnimatePresence;
