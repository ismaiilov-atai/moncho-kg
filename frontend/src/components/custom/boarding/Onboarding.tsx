import { ONBOARDING_COMPLETED } from '@/lib/constants';
import { AnimatePresence, motion } from 'motion/react';
import { useDeviceStore } from '@/stores/device-store';
import OnboardingContent from './OnboardingContent';
import { Button } from '@/components/ui/button';
import { useNavHome } from '@/hooks/useNavHome';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

const progressWidth: { [key: number]: string } = {
  25: 'w-1/4',
  50: 'w-1/2',
  75: 'w-3/4',
  100: 'w-full',
};

interface PageProps {
  setOpenDialog?: (state: boolean) => void;
}

const Onboarding = ({ setOpenDialog }: PageProps) => {
  const navigateHome = useNavHome();
  const { t } = useTranslation();
  const { isMobile } = useDeviceStore((state) => state);
  const [boardingPage, setBoardingPage] = useState(0);
  const [progress, setProgress] = useState(25);

  const skipLanding = () => {
    localStorage.setItem(ONBOARDING_COMPLETED, 'true');
    isMobile ? navigateHome() : setOpenDialog && setOpenDialog(false);
  };

  const nextOrGotItClick = () => {
    setProgress(progress + 25);
    boardingPage < 3
      ? setBoardingPage((prevPage) => prevPage + 1)
      : skipLanding();
  };

  return (
    <div className='flex flex-col max-xs:h-full max-xs:justify-center'>
      <motion.div
        className={`bg-primary h-1 sticky top-0 left-0 ${progressWidth[progress]}`}
        transition={{ ease: 'easeInOut', duration: 0.8 }}
        animate={{ width: `${progress}%` }}></motion.div>

      <div className='w-full '>
        <AnimatePresence mode='wait'>
          <OnboardingContent boardingPage={boardingPage} />
        </AnimatePresence>
        <section className='w-full flex justify-between absolute bottom-5 left-0 p-3 text-primary'>
          <Button
            onClick={skipLanding}
            variant={isMobile ? 'outline' : 'ghost'}
            className={cn('hover:text-primary', {
              invisible: boardingPage >= 3,
            })}>
            {t('skip')}
          </Button>
          <Button
            variant={isMobile ? 'outline' : 'ghost'}
            className='hover:text-primary'
            onClick={nextOrGotItClick}>
            {boardingPage < 3 ? t('next') : t('gotit')}
          </Button>
        </section>
      </div>
    </div>
  );
};

export default Onboarding;
