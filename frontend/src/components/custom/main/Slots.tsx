import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import ReservationDialogActions from '@/components/custom/resorvations/ReservationDialogActions';
import ReservationDialogHeader from '@/components/custom/resorvations/ReservationDialogHeader';
import { useRescheduleStore } from '@/stores/reschedule-store';
import { rescheduleReservation } from '@/helpers/resorvation';
import { Button, buttonVariants } from '../../ui/button';
import CheckoutStatus from '@/components/CheckoutStatus';
import { FormEvent, useEffect, useState } from 'react';
import { useStripeStore } from '@/stores/stripe-store';
import { useMutation } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { useUserStore } from '@/stores/user-store';
import { useToast } from '@/hooks/use-toast';
import { SlotsType } from '@/types/day';
import moment from 'moment-timezone';
import { cn } from '@/lib/utils';
import { api } from '@/lib/api';

interface Props {
  slots: SlotsType[];
  isPending: boolean;
}

const Slots = ({ slots, isPending }: Props) => {
  const { stripeStatus, updateClientSecret } = useStripeStore((state) => state);
  const [selectedTimeSlot, setselectedTimeSlot] = useState<SlotsType>(
    {} as SlotsType
  );

  const { bookingToReschedule, isRescheduling, updateIsRescheduling } =
    useRescheduleStore((state) => state);
  const { updateRescheduledResorvation } = useUserStore((state) => state);

  const {
    mutateAsync,
    isPending: mutationPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: rescheduleReservation,
  });
  const { toast } = useToast();
  const [reserveDialogOpen, setReserveDialog] = useState(false);
  const [guest, setGuest] = useState(0);
  useEffect(() => setGuest(0), [selectedTimeSlot]);

  const guestNumberClick = (action: 'up' | 'down') => {
    if (
      action === 'up' &&
      guest < 9 &&
      selectedTimeSlot.spaceLeft - 1 > guest
    ) {
      setGuest((prev) => (prev += 1));
    } else if (action === 'down' && guest > 0) {
      setGuest((prev) => (prev -= 1));
    }
  };

  const onClickTimeSlot = (slot: SlotsType) => {
    setReserveDialog(true);
    setselectedTimeSlot(slot);
  };

  const timePassed = (time: string): boolean => {
    return moment(time).isBefore(moment(), 'hour');
  };

  const onBoookAction = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resp = await api['checkout-session'].$post({
      query: {
        slotId: selectedTimeSlot.slotId,
        guest,
      },
    });
    const data = await resp.json();

    if (data.clientSecret) updateClientSecret(data.clientSecret);
  };

  const onRescheduleAction = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await mutateAsync({
      bookingId: bookingToReschedule.bookingId!,
      selectedTimeSlotId: selectedTimeSlot.slotId,
    });
    if (isError) {
      toast({
        variant: 'destructive',
        title: 'Failed to reschedul',
        description: `please try again`,
      });
    }
    updateRescheduledResorvation(data.reservation!);
    setReserveDialog(false);
    updateIsRescheduling(false);
    if (isSuccess)
      toast({
        title: 'Successfully rescheduled',
        description: `changed to: ${moment(data.reservation.when).format('MMM DD HH:mm')}`,
      });
  };

  const onCancel = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setReserveDialog(false);
  };

  return (
    <div className=' pl-2 pr-2 grid grid-cols-3 md:grid-cols-4 gap-5 justify-between w-full '>
      {slots.map((slot, index) => {
        return isPending ? (
          <Skeleton
            className={buttonVariants({ variant: 'secondary' })}
            key={`${slot.slotId} - ${index}`}
          />
        ) : (
          <Dialog
            key={slot.slotId}
            onOpenChange={setReserveDialog}
            open={reserveDialogOpen || stripeStatus.length > 0}>
            <DialogTrigger asChild>
              <Button
                key={slot.slotId}
                className={cn(`text-wrap`, {
                  'pointer-events-none bg-secondary text-gray-300': timePassed(
                    slot.time
                  ),
                })}
                onClick={() => onClickTimeSlot(slot)}>
                {moment(slot.time).format('HH:mm DD')}
              </Button>
            </DialogTrigger>

            <DialogContent className='w-3/4 max-h-fit rounded-sm h-1/2 '>
              <ReservationDialogHeader />
              {stripeStatus ? (
                <CheckoutStatus />
              ) : (
                <ReservationDialogActions
                  onSubmitAction={
                    isRescheduling ? onRescheduleAction : onBoookAction
                  }
                  onCancel={onCancel}
                  guest={guest}
                  guestNumberClick={guestNumberClick}
                  selectedTimeSlot={selectedTimeSlot}
                  isPending={mutationPending}
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
