import { createLazyFileRoute } from '@tanstack/react-router';
import Upcoming from '@/components/custom/main/Upcoming';
import Home from '@/components/custom/main/Home';
import NoData from '@/components/custom/NoData';
import OnboardingModal from '@/components/custom/boarding/OnboardingModal';
import { ONBOARDING_COMPLETED } from '@/lib/constants';
import { useDeviceStore } from '@/stores/device-store';

export const Route = createLazyFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const days = Route.useLoaderData();
  const { isMobile } = useDeviceStore.getState();
  const onboardingCompleted = localStorage.getItem(ONBOARDING_COMPLETED);
  if (days.length <= 0) return <NoData />;
  return (
    <div className=' flex flex-col gap-10'>
      <Home days={days} isPending={false} />
      <Upcoming />
      {!onboardingCompleted && !isMobile && <OnboardingModal />}
    </div>
  );
}
