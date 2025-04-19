import ReservationDialogActions from '@/components/custom/resorvations/ReservationDialogActions';
import ReservationDialogHeader from '@/components/custom/resorvations/ReservationDialogHeader';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import CheckoutStatus from '@/components/CheckoutStatus';
import { FormEvent, useEffect, useState } from 'react';
import { useStripeStore } from '@/stores/stripe-store';
import { useSlotsStore } from '@/stores/slots-store';
import { Skeleton } from '@/components/ui/skeleton';
import { buttonVariants } from '../../../ui/button';
import { useUserStore } from '@/stores/user-store';
import SlotTriggerer from './SlotTriggerer';
import { SlotsType } from '@/types/day';
import { cn } from '@/lib/utils';
import { api } from '@/lib/api';

interface Props {
  slots: SlotsType[];
  isPending?: boolean;
}

const Slots = ({ slots, isPending }: Props) => {
  const { stripeStatus, updateClientSecret } = useStripeStore((state) => state);
  const { selectedSlot } = useSlotsStore((state) => state);
  const { name, lastName } = useUserStore((state) => state);
  const [reserveDialogOpen, setReserveDialogState] = useState(false);
  useEffect(() => setGuest(0), [selectedSlot]);
  const [guest, setGuest] = useState(0);

  const guestNumberClick = (action: 'up' | 'down') => {
    if (action === 'up' && guest < 9 && selectedSlot.spaceLeft - 1 > guest) {
      setGuest((prev) => (prev += 1));
    } else if (action === 'down' && guest > 0) {
      setGuest((prev) => (prev -= 1));
    }
  };

  const onBoookAction = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resp = await api['checkout-session'].$post({
      query: {
        slotId: selectedSlot.slotId,
        guest,
      },
    });
    const data = await resp.json();
    if (data.clientSecret) updateClientSecret(data.clientSecret);
  };

  const onOpenChangeListener = (dialogState: boolean) => {
    name && lastName && setReserveDialogState(dialogState);
  };

  const onCancel = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setReserveDialogState(false);
  };

  return (
    <div className=' pl-2 pr-2 grid grid-cols-1 sm:grid-cols-2 gap-4 justify-between w-full h-full'>
      {slots.map((slot, index) => {
        return isPending ? (
          <Skeleton
            className={cn(buttonVariants({ variant: 'link' }))}
            key={`${slot.slotId} - ${index}`}
          />
        ) : (
          <Dialog
            key={slot.slotId}
            onOpenChange={onOpenChangeListener}
            open={
              (Object.hasOwn(selectedSlot, 'time') && reserveDialogOpen) ||
              stripeStatus.length > 0
            }>
            <SlotTriggerer
              slot={slot}
              setReserveDialogState={setReserveDialogState}
            />

            <DialogContent className=' w-[90%] max-h-fit max-xs:h-[80%] rounded-sm h-1/2 '>
              <ReservationDialogHeader />
              {stripeStatus ? (
                <CheckoutStatus />
              ) : (
                <ReservationDialogActions
                  onSubmitAction={onBoookAction}
                  onCancel={onCancel}
                  guest={guest}
                  guestNumberClick={guestNumberClick}
                  selectedTimeSlot={selectedSlot}
                  isPending={false}
                />
              )}
            </DialogContent>
          </Dialog>
        );
      })}
    </div>
  );
};

export default Slots;
