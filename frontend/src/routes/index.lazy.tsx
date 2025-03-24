import OnboardingModal from '@/components/custom/boarding/OnboardingModal';
import { createLazyFileRoute } from '@tanstack/react-router';
import { ONBOARDING_COMPLETED } from '@/lib/constants';
import { useDeviceStore } from '@/stores/device-store';
import Home from '@/components/custom/main/Home';

export const Route = createLazyFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { isMobile } = useDeviceStore.getState();
  const onboardingCompleted = localStorage.getItem(ONBOARDING_COMPLETED);
  return (
    <div className=' flex flex-col gap-10 px-3 '>
      <Home />
      {!onboardingCompleted && !isMobile && <OnboardingModal />}
    </div>
  );
}
