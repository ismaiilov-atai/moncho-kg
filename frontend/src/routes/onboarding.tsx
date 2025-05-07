import { createFileRoute, redirect } from '@tanstack/react-router';
import { ONBOARDING_COMPLETED } from '@/lib/constants';
import { useDeviceStore } from '@/stores/device-store';

export const Route = createFileRoute('/onboarding')({
  beforeLoad: () => {
    const onboardingCompleted = localStorage.getItem(ONBOARDING_COMPLETED);
    const { isMobile } = useDeviceStore.getState();

    if (!isMobile && !onboardingCompleted) throw redirect({ to: '/' });
  },
});
