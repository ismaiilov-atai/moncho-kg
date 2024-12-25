import { JwtTokenExpired, JwtTokenInvalid } from 'hono/utils/jwt/types';
import { createFileRoute, Navigate } from '@tanstack/react-router';
import { daysQueryOptions, userQueryOptions } from '@/lib/api';
import { DaysType, SlotsType } from '@/types/day-types';
import { ACCESS_TOKEN } from '@server/types/constants';
import { useSlotsStore } from '@/stores/slots-store';
import { useUserStore } from '@/stores/user-store';
import Home from '@/components/custom/main/Home';
import { toast } from '@/hooks/use-toast';
import { fakeDays } from '@/lib/fakers';

const findSlotsByDayId = (dayId: string, days: DaysType[]): SlotsType[] => {
  return days.find((day) => day.dayId === dayId)?.slots || days[0].slots;
};

export const Route = createFileRoute('/')({
  pendingComponent: () => <Home days={fakeDays} isPending />,
  beforeLoad: async ({ context: { queryClient } }) => {
    try {
      const { updateUserId, userId, updateReservations } =
        useUserStore.getState();
      if (!userId) {
        const result = await queryClient.ensureQueryData(userQueryOptions);
        if ('err' in result) throw result.err;
        sessionStorage.setItem(ACCESS_TOKEN, result.token || '');
        updateUserId(result.user?.userId || '');
        const reservations = result.user?.usersToSlots.map((item) => item.slot);
        updateReservations(reservations || []);
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
});
