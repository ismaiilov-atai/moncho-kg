import { ONBOARDING_COMPLETED } from '@/lib/constants';
import { useDeviceStore } from '@/stores/device-store';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/onboarding')({
  beforeLoad: () => {
    const onboardingCompleted = localStorage.getItem(ONBOARDING_COMPLETED);
    const { isMobile } = useDeviceStore.getState();

    if (!isMobile && !onboardingCompleted)
      throw redirect({
        to: '/',
        search: {
          session_id: '',
          guest: 0,
          slotId: '',
        },
      });
  },
});
