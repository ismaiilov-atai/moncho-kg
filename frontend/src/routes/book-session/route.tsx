import { createFileRoute, stripSearchParams } from '@tanstack/react-router';
import { BOOK_SESSION_SEARCH_DEFAULT_VALUES } from '@/lib/constants';
import { createResevation } from '@/helpers/resorvation';
import { fetchDaysAndSetSelectedId } from '@/lib/utils';
import { BookingType } from '@server/types/reservation';
import { useStripeStore } from '@/stores/stripe-store';
import { BookSessionComponent } from './route.lazy';
import { useUserStore } from '@/stores/user-store';
import { StripeQueryResult } from '@/types/stripe';
import { api } from '@/lib/api';
import moment from 'moment';

const updateAndSortResoLocally = (
  newReservation: BookingType,
  prevReservations: BookingType[]
) => {
  return [newReservation, ...prevReservations].sort((a, b) =>
    moment(a.when).diff(moment(b.when))
  );
};

export const Route = createFileRoute('/book-session')({
  loader: async ({ context: { queryClient } }) =>
    fetchDaysAndSetSelectedId(queryClient),
  beforeLoad: async ({ search }) => {
    const { updateReservations, reservations } = useUserStore.getState();
    const { updateStripeStatus } = useStripeStore.getState();
    try {
      if (search.session_id) {
        const resp = await api['checkout-session'].$get({
          query: {
            session_id: search.session_id,
          },
        });
        const payment = await resp.json();

        if (payment.status === 'complete') {
          const response = await createResevation({
            userId: search.userId,
            slotId: search.slotId,
            withYou: search.guest > 0 ? search.guest : 0,
          });
          updateReservations(
            updateAndSortResoLocally(response.reservation, reservations)
          );
        }
        updateStripeStatus(payment.status || '');
      }
    } catch (error) {
      throw error;
    }
  },
  pendingComponent: () => <BookSessionComponent isPending={true} />,
  validateSearch: (search: Record<string, unknown>): StripeQueryResult => {
    return {
      session_id: search.session_id as string,
      guest: search.guest as number,
      slotId: search.slotId as string,
      userId: search.userId as string,
    };
  },
  search: {
    middlewares: [stripSearchParams(BOOK_SESSION_SEARCH_DEFAULT_VALUES)],
  },
});
