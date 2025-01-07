import { Button, buttonVariants } from '../../ui/button';
import CheckoutStatus from '@/components/CheckoutStatus';
import { FormEvent, useEffect, useState } from 'react';
import { useStripeStore } from '@/stores/stripe-store';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { SlotsType } from '@/types/day';
import moment from 'moment-timezone';
import { cn } from '@/lib/utils';
import { api } from '@/lib/api';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface Props {
  slots: SlotsType[];
  isPending: boolean;
}

const Slots = ({ slots, isPending }: Props) => {
  const { stripeStatus, updateClientSecret } = useStripeStore((state) => state);
  const [timeSlot, setTimeSlot] = useState<SlotsType>({} as SlotsType);
  const [reserveDialogOpen, setReserveDialog] = useState(false);
  const [guest, setGuest] = useState(0);
  useEffect(() => setGuest(0), [timeSlot]);

  const guestNumberClick = (action: 'up' | 'down') => {
    if (action === 'up' && guest < 9 && timeSlot.spaceLeft - 1 > guest) {
      setGuest((prev) => (prev += 1));
    } else if (action === 'down' && guest > 0) {
      setGuest((prev) => (prev -= 1));
    }
  };

  const onClickTimeSlot = (slot: SlotsType) => {
    setReserveDialog(true);
    setTimeSlot(slot);
  };

  const timePassed = (time: string): boolean => {
    return moment(time).isBefore(moment(), 'hour');
  };

  const onBoookAction = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resp = await api['checkout-session'].$post({
      query: {
        slotId: timeSlot.slotId,
        guest,
      },
    });
    const data = await resp.json();

    if (data.clientSecret) updateClientSecret(data.clientSecret);
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

            <DialogContent className={`w-3/4 max-h-fit rounded-sm h-1/2 `}>
              <DialogHeader className='pt-2'>
                <DialogTitle>Complete your reservation</DialogTitle>
                <DialogDescription>
                  Please complete your reservation
                </DialogDescription>
              </DialogHeader>
              {stripeStatus ? (
                <CheckoutStatus />
              ) : (
                <div className='flex flex-col gap-5 h-full justify-between '>
                  <div className=' flex justify-between'>
                    <span className='font-serif'>Space left:</span>
                    <span>{timeSlot.spaceLeft - (guest + 1)}</span>
                  </div>
                  <Separator />
                  <div className='flex w-full justify-between'>
                    <span className=' font-semibold'>Time:</span>
                    <span>{moment(timeSlot.time).format('HH:mm DD MMM')}</span>
                  </div>
                  <Separator />
                  <div className=' flex items-center h-9 justify-between w-full '>
                    <span className='text-pretty font-bold text-xs w-1/2 '>
                      How many with you?
                    </span>
                    <div className=' flex gap-2 justify-around items-center w-1/2'>
                      <Button
                        variant={'outline'}
                        className='h-4 w-1 rounded-xs'
                        onClick={() => guestNumberClick('down')}>
                        -
                      </Button>
                      <span className='font-semibold w-1 text-left'>
                        {guest}
                      </span>
                      <Button
                        variant={'outline'}
                        className='h-4 w-1 rounded-xs'
                        onClick={() => guestNumberClick('up')}>
                        +
                      </Button>
                    </div>
                  </div>
                  <form
                    onSubmit={(e) => onBoookAction(e)}
                    className='w-full flex justify-end gap-2'>
                    {/* <div className=''> */}
                    <Button
                      variant={'destructive'}
                      onClick={() => setReserveDialog(false)}>
                      Cancel
                    </Button>
                    <Button type='submit'>Book</Button>
                  </form>
                </div>
              )}
            </DialogContent>
          </Dialog>
        );
      })}
    </div>
  );
};

export default Slots;
