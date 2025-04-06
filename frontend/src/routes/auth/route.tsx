import VerifyOTP from '@/components/custom/signup/VerifyOTP';
import { AnimatePresence, motion, wrap } from 'motion/react';
import Details from '@/components/custom/signup/Details';
import { createFileRoute } from '@tanstack/react-router';
import Phone from '@/components/custom/signup/Phone';
import { useSlotsStore } from '@/stores/slots-store';
import { useAuthStore } from '@/stores/signup-store';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { t } from 'i18next';

const variants = {
  enter: (direction: boolean) => ({
    x: direction ? -100 : 40,
    opacity: 0,
  }),
  exit: (direction: boolean) => ({
    zIndex: 0,
    x: direction ? 200 : -200,
    opacity: 0,
  }),
};

export const Route = createFileRoute('/auth')({
  head: () => ({
    meta: [
      { title: `${t('Signup')} MonchoKG` },
      { name: 'description', content: t('board-welcome-description') },
    ],
  }),
  component: AuthComponent,
});

function AuthComponent() {
  const { t } = useTranslation();
  const { authPageCount, backwordAuthPageCount, isComingBack } = useAuthStore(
    (state) => state
  );
  const componentsToDisplay = [<Details />, <Phone />, <VerifyOTP />];
  const { selectedSlot } = useSlotsStore((state) => state);
  const { toast } = useToast();
  const componentIndex = wrap(0, componentsToDisplay.length, authPageCount);

  useEffect(() => {
    selectedSlot.slotId &&
      toast({
        title: t('Signup'),
        description: t('signup-toast-description'),
      });
  }, []);

  return (
    <div className='w-full flex max-md:flex-col h-[85dvh] items-center max-sm:relative gap-4 max-md:justify-between justify-center p-10 max-sm:p-0 m-0'>
      <section
        onClick={() => backwordAuthPageCount(authPageCount)}
        className={cn(
          'sm:absolute max-sm:mt-2 max-sm:bg-muted/20 max-sm:ml-2 self-start left-3 lg:left-[10%] top-[8%] flex gap-2 items-center hover:bg-accent/40 p-2 rounded-sm visible text-muted-foreground',
          { ' hidden ': authPageCount === 0 }
        )}>
        <ArrowLeft />
        <p>{t('back')}</p>
      </section>
      <AnimatePresence mode='wait' custom={isComingBack}>
        <motion.div
          key={`_${authPageCount}`}
          className='h-full w-full max-sm:m-0 max-sm:p-0 max-sm:pt-10 max-md:mt-8'
          variants={variants}
          initial='enter'
          exit='exit'
          animate={{ x: 0, opacity: 1 }}
          custom={isComingBack}
          transition={{
            duration: 0.4,
            bounce: 0.35,
            type: 'spring',
          }}>
          {componentsToDisplay[componentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
