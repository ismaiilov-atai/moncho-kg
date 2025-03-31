import ReservationDialogActions from '@/components/custom/resorvations/ReservationDialogActions';
import ReservationDialogHeader from '@/components/custom/resorvations/ReservationDialogHeader';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useRescheduleStore } from '@/stores/reschedule-store';
import { rescheduleReservation } from '@/helpers/resorvation';
import CheckoutStatus from '@/components/CheckoutStatus';
import { FormEvent, useEffect, useState } from 'react';
import { useStripeStore } from '@/stores/stripe-store';
import { useNavigate } from '@tanstack/react-router';
import { useSlotsStore } from '@/stores/slots-store';
import { Skeleton } from '@/components/ui/skeleton';
import { useMutation } from '@tanstack/react-query';
import { useUserStore } from '@/stores/user-store';
import { buttonVariants } from '../../ui/button';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { SlotsType } from '@/types/day';
import moment from 'moment-timezone';
import { Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { api } from '@/lib/api';

interface Props {
  slots: SlotsType[];
  isPending?: boolean;
}

const Slots = ({ slots, isPending }: Props) => {
  const { t } = useTranslation();
  const { stripeStatus, updateClientSecret } = useStripeStore((state) => state);
  const { selectedSlot, updateSelectedSlot } = useSlotsStore((state) => state);
  const { name, lastName, phoneNumber } = useUserStore((state) => state);
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
  const navigate = useNavigate();
  const { toast } = useToast();
  const [reserveDialogOpen, setReserveDialog] = useState(false);
  const [guest, setGuest] = useState(0);
  useEffect(() => setGuest(0), [selectedSlot]);

  const guestNumberClick = (action: 'up' | 'down') => {
    if (action === 'up' && guest < 9 && selectedSlot.spaceLeft - 1 > guest) {
      setGuest((prev) => (prev += 1));
    } else if (action === 'down' && guest > 0) {
      setGuest((prev) => (prev -= 1));
    }
  };

  const onClickTimeSlot = (slot: SlotsType) => {
    updateSelectedSlot(slot);
    if (name && phoneNumber) setReserveDialog(true);
    else navigate({ to: '/auth' });
  };

  const timePassed = (time: string): boolean => {
    return moment(time).isBefore(moment(), 'hour');
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

  const onRescheduleAction = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await mutateAsync({
      bookingId: bookingToReschedule.bookingId!,
      selectedTimeSlotId: selectedSlot.slotId,
    });
    if (isError) {
      toast({
        variant: 'destructive',
        title: 'Failed to reschedul',
        description: `please try again`,
      });
      return;
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

  const onOpenChangeListener = (dialogState: boolean) => {
    name && lastName && setReserveDialog(dialogState);
  };

  const onCancel = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setReserveDialog(false);
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
            <DialogTrigger asChild>
              <Card
                key={`_${slot.slotId}`}
                id={`_${slot.slotId}`}
                onClick={() => onClickTimeSlot(slot)}
                className={cn(
                  'h-16 justify-center flex flex-col p-3 border-muted rounded-sm shadow-sm hover:bg-accent/30',
                  { 'pointer-events-none hidden': timePassed(slot.time) }
                )}>
                <p className=' font-roboto text-lg'>
                  {moment(slot.time).format('HH:mm')}
                  <span> - </span>
                  {moment(slot.time).add(1.25, 'hours').format('HH:mm')}
                </p>
                <p className='text-muted-foreground text-sm flex items-center space-x-2'>
                  <Users size={16} />
                  <span>10 {t('of')} 10</span>
                </p>
              </Card>
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
                  selectedTimeSlot={selectedSlot}
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
