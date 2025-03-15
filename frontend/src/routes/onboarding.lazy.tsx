import OnboardingWith from '@/components/custom/boarding/OnboardingWith';
import { createLazyFileRoute } from '@tanstack/react-router';
import { ONBOARDING_COMPLETED } from '@/lib/constants';
import { AnimatePresence, motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { useNavHome } from '@/hooks/useNavHome';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const progressWidth: { [key: number]: string } = {
  25: 'w-1/4',
  50: 'w-1/2',
  75: 'w-3/4',
  100: 'w-full',
};

export const Route = createLazyFileRoute('/onboarding')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigateHome = useNavHome();
  const [boardingPage, setBoardingPage] = useState(0);
  const [progress, setProgress] = useState(25);

  const skipLanding = () => {
    localStorage.setItem(ONBOARDING_COMPLETED, 'true');
    navigateHome();
  };

  const nextOrGotItClick = () => {
    setProgress(progress + 25);
    boardingPage < 3
      ? setBoardingPage((prevPage) => prevPage + 1)
      : skipLanding();
  };

  return (
    <>
      <motion.div
        className={`bg-primary h-1 sticky top-0 left-0 ${progressWidth[progress]}`}
        transition={{ ease: 'easeInOut', duration: 0.8 }}
        animate={{ width: `${progress}%` }}></motion.div>
      <div className='w-full flex h-dvh items-center flex-col justify-around p-6'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={`_${boardingPage}`}
            className='h-full w-full'
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -500, opacity: 0 }}
            transition={{
              duration: 0.4,
              bounce: 0.35,
              type: 'spring',
            }}>
            {<OnboardingWith page={boardingPage} />}
          </motion.div>
        </AnimatePresence>
        <section className='w-full flex justify-between absolute bottom-5 left-0 p-3 text-primary '>
          <Button
            onClick={skipLanding}
            variant={'ghost'}
            className={cn({
              invisible: boardingPage >= 3,
            })}>
            SKIP
          </Button>
          <Button variant={'ghost'} onClick={nextOrGotItClick}>
            {boardingPage < 3 ? 'NEXT' : 'GOT IT'}
          </Button>
        </section>
      </div>
    </>
  );
}
