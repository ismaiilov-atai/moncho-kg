import SigninAnimatePresence from '@/components/custom/signup/SigninAnimatePresence';
import BackArrowButton from '@/components/custom/BackArrowButton';
import VerifyOTP from '@/components/custom/signup/VerifyOTP';
import Details from '@/components/custom/signup/Details';
import { createFileRoute } from '@tanstack/react-router';
import Phone from '@/components/custom/signup/Phone';
import { useSlotsStore } from '@/stores/slots-store';
import { useAuthStore } from '@/stores/signup-store';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';
import { wrap } from 'motion/react';
import { useEffect } from 'react';
import { t } from 'i18next';

export const Route = createFileRoute('/signup')({
  head: () => ({
    meta: [
      { title: `${t('Signup')} MonchoKG` },
      { name: 'description', content: t('board-welcome-description') },
    ],
  }),
  component: SignupComponent,
});

function SignupComponent() {
  const { t } = useTranslation();
  const { authPageCount } = useAuthStore((state) => state);
  const componentsToDisplay = [<Details />, <Phone />, <VerifyOTP />];
  const componentIndex = wrap(0, componentsToDisplay.length, authPageCount);
  const { selectedSlot } = useSlotsStore((state) => state);
  const { toast } = useToast();

  useEffect(() => {
    selectedSlot.slotId &&
      toast({
        title: t('Signup'),
        description: t('signup-toast-description'),
      });
  }, []);

  return (
    <div className='w-full flex max-md:flex-col h-[80dvh] items-center max-sm:relative gap-4 max-md:justify-between justify-center px-10 py-4 max-sm:p-0 m-0'>
      <SigninAnimatePresence>
        {componentsToDisplay[componentIndex]}
      </SigninAnimatePresence>
    </div>
  );
}
