import { createFileRoute, Navigate, redirect } from '@tanstack/react-router';
import { JwtTokenExpired, JwtTokenInvalid } from 'hono/utils/jwt/types';
import { useDeviceStore } from '@/stores/device-store';
import { ONBOARDING_COMPLETED } from '@/lib/constants';
import Home from '@/components/custom/main/Home';
import { toast } from '@/hooks/use-toast';

export const Route = createFileRoute('/')({
  pendingComponent: () => <Home />,
  beforeLoad: async () => {
    try {
      const { isMobile } = useDeviceStore.getState();
      const onboardingCompleted = localStorage.getItem(ONBOARDING_COMPLETED);

      if (!onboardingCompleted && isMobile) {
        throw redirect({
          to: '/onboarding',
        });
      }
    } catch (error) {
      throw error;
    }
  },
  errorComponent: ({ error }) => {
    if (error instanceof JwtTokenExpired || JwtTokenInvalid) {
      toast({
        title: 'Unauthorized',
        description: 'Please sign-up or login in order to use the app!',
        variant: 'destructive',
      });
      return Navigate({ to: '/signup' });
    } else {
      throw error;
    }
  },
});
