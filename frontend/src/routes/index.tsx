import { JwtTokenExpired, JwtTokenInvalid } from 'hono/utils/jwt/types';
import { api, daysQueryOptions, userQueryOptions } from '@/lib/api';
import { useStripeStore } from '@/stores/stripe-store';
import { ACCESS_TOKEN } from '@server/types/constants';
import { useSlotsStore } from '@/stores/slots-store';
import { useUserStore } from '@/stores/user-store';
import { useDeviceStore } from '@/stores/device-store';
import { StripeQueryResult } from '@/types/stripe';
import Home from '@/components/custom/main/Home';
import { findSlotsByDayId } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { fakeDays } from '@/lib/fakers';
import { DaysType } from '@/types/day';
import {
  createFileRoute,
  Navigate,
  redirect,
  stripSearchParams,
} from '@tanstack/react-router';
import { ONBOARDING_COMPLETED } from '@/lib/constants';

const searchDefaultValues = { session_id: '', guest: 0, slotId: '' };

export const Route = createFileRoute('/')({
  pendingComponent: () => <Home days={fakeDays} isPending />,
  beforeLoad: async ({ context: { queryClient }, search }) => {
    try {
      const {
        updateUserId,
        userId,
        updateReservations,
        updateFirstName,
        updatePhoneNumber,
        updateLastName,
        updateBeenTimes,
      } = useUserStore.getState();

      const { updateStripeStatus } = useStripeStore.getState();
      const { isMobile } = useDeviceStore.getState();
      const onboardingCompleted = localStorage.getItem(ONBOARDING_COMPLETED);

      if (!onboardingCompleted && isMobile) {
        throw redirect({
          to: '/onboarding',
        });
      }

      if (!userId) {
        const result = await queryClient.ensureQueryData(userQueryOptions);

        if (search.session_id) {
          const resp = await api['checkout-session'].$get({
            query: {
              session_id: search.session_id,
            },
          });
          const payment = await resp.json();
          updateStripeStatus(payment.status || '');
        }
        if ('err' in result) throw result.err;
        sessionStorage.setItem(ACCESS_TOKEN, result.token!);
        updateUserId(result.user?.userId!);
        const { reservations, name, lastName, phoneNumber, beenTimes } =
          result.user;

        updateReservations(reservations || []);
        updateFirstName(name!);
        updateLastName(lastName!);
        updatePhoneNumber(phoneNumber!);
        updateBeenTimes(beenTimes!);
      }
    } catch (error) {
      throw error;
    }
  },
  loader: async ({ context: { queryClient } }) => {
    const days = await queryClient.ensureQueryData(daysQueryOptions);
    const { updateSelectedDayId, updateSlots, selectedDayId } =
      useSlotsStore.getState();
    updateSelectedDayId(selectedDayId || days[0].dayId);
    updateSlots(findSlotsByDayId(selectedDayId, days as DaysType[]));
    return days;
  },
  errorComponent: ({ error }) => {
    if (error instanceof JwtTokenExpired || JwtTokenInvalid) {
      toast({
        title: 'Unauthorized',
        description: 'Please sign-up or sign-in in order to use the app!',
        variant: 'destructive',
      });
      return Navigate({ to: '/auth' });
    } else {
      throw error;
    }
  },
  validateSearch: (search: Record<string, unknown>): StripeQueryResult => {
    return {
      session_id: search.session_id as string,
      guest: search.guest as number,
      slotId: search.slotId as string,
    };
  },
  search: {
    middlewares: [stripSearchParams(searchDefaultValues)],
  },
});
