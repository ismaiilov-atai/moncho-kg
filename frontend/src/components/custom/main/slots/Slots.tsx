import ReservationDialogActions from '@/components/custom/resorvations/ReservationDialogActions';
import ReservationDialogHeader from '@/components/custom/resorvations/ReservationDialogHeader';
import { FormEvent, memo, useCallback, useEffect, useState } from 'react';
import { getRouteApi, useNavigate } from '@tanstack/react-router';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import CheckoutStatus from '@/components/CheckoutStatus';
import { useStripeStore } from '@/stores/stripe-store';
import { useSlotsStore } from '@/stores/slots-store';
import { Skeleton } from '@/components/ui/skeleton';
import { buttonVariants } from '../../../ui/button';
import { useMutation } from '@tanstack/react-query';
import { useUserStore } from '@/stores/user-store';
import SlotTriggerer from './SlotTriggerer';
import { SlotsType } from '@/types/day';
import { cn } from '@/lib/utils';
import { api } from '@/lib/api';

interface Props {
  slots: SlotsType[];
  isPending?: boolean;
}

interface MutationParams {
  slotId: string;
  guest: number;
}

const apiRoute = getRouteApi('/book-session');

const Slots = memo(({ slots, isPending }: Props) => {
  const search = apiRoute.useSearch();
  const { stripeStatus, updateClientSecret } = useStripeStore((state) => state);
  const { reservations, updateReservations, updateBeenTimes, beenTimes } =
    useUserStore((state) => state);
  const { selectedSlot } = useSlotsStore((state) => state);
  const { userId } = useUserStore((state) => state);
  const [reserveDialogOpen, setReserveDialogState] = useState(false);
  const [guest, setGuest] = useState(0);
  const navigate = useNavigate();
  useEffect(() => setGuest(0), [selectedSlot]);

  const {
    mutateAsync,
    isPending: isMutating,
    isError,
  } = useMutation({
    mutationFn: async ({ slotId, guest }: MutationParams) => {
      return await api['checkout-session'].$post({
        query: { slotId, userId, guest },
      });
    },
  });

  const guestNumberClick = (action: 'up' | 'down') => {
    if (action === 'up' && guest < 9 && selectedSlot.spaceLeft - 1 > guest) {
      setGuest((prev) => (prev += 1));
    } else if (action === 'down' && guest > 0) {
      setGuest((prev) => (prev -= 1));
    }
  };

  const fetchClientSecret = useCallback(
    async (slotId: string, guest: number) => {
      const data = await mutateAsync({ slotId, guest });
      if (isError) throw Error('Failed to fetch client secret ');
      const result = await data.json();
      if (result.clientSecret) return result.clientSecret;

      if (result.bookingParams) {
        updateReservations([...reservations, result.newReso]);
        updateBeenTimes(beenTimes >= 4 ? 0 : beenTimes + 1);
        navigate({
          to: '/book-session',
          search: {
            session_id: result.bookingParams.session_id,
            guest: Number(result.bookingParams.guest),
            slotId: result.bookingParams.slotId,
            userId: result.bookingParams.userId,
          },
        });
      }
    },
    []
  );

  const onBoookAction = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const clientSecret = await fetchClientSecret(selectedSlot.slotId, guest);
    if (clientSecret) updateClientSecret(clientSecret);
  };

  const onCancel = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setReserveDialogState(false);
  };

  return (
    <div className='pl-2 pr-2 grid grid-cols-1 sm:grid-cols-2 gap-4 justify-between w-full'>
      {slots.map((slot, index) => {
        return isPending ? (
          <Skeleton
            className={cn(buttonVariants({ variant: 'link' }))}
            key={`${slot.slotId} - ${index}`}
          />
        ) : (
          <Dialog
            key={slot.slotId}
            open={
              (Object.hasOwn(selectedSlot, 'time') && reserveDialogOpen) ||
              (stripeStatus.length > 0 && !!search.session_id)
            }>
            <SlotTriggerer
              slot={slot}
              setReserveDialogState={setReserveDialogState}
            />
            <DialogContent className=' w-[90%] max-h-fit max-xs:h-[80%] rounded-sm h-2/3 '>
              {search.session_id ? (
                <CheckoutStatus />
              ) : (
                <>
                  <ReservationDialogHeader />
                  <ReservationDialogActions
                    onSubmitAction={onBoookAction}
                    onCancel={onCancel}
                    guest={guest}
                    guestNumberClick={guestNumberClick}
                    selectedTimeSlot={selectedSlot}
                    isPending={isMutating}
                  />
                </>
              )}
            </DialogContent>
          </Dialog>
        );
      })}
    </div>
  );
});

export default Slots;
