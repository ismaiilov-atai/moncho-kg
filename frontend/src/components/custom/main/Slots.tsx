import { CircleCheckBig, LoaderIcon, TriangleAlert } from 'lucide-react';
import { Button, buttonVariants } from '../../ui/button';
import { createResevation } from '@/helpers/resorvation';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { useMutation } from '@tanstack/react-query';
import { useUserStore } from '@/stores/user-store';
import { SlotsType } from '@/types/day-types';
import { useEffect, useState } from 'react';
import moment from 'moment';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { DialogTrigger } from '@radix-ui/react-dialog';

interface Props {
  slots: SlotsType[];
  isPending: boolean;
}

const Slots = ({ slots, isPending }: Props) => {
  const {
    mutateAsync,
    isPending: isPendingMutation,
    isSuccess,
    isError,
    reset,
  } = useMutation({
    mutationFn: createResevation,
  });

  const { userId, updateReservations, reservations } = useUserStore(
    (state) => state
  );
  const [timeSlot, setTimeSlot] = useState<SlotsType>({} as SlotsType);
  const [reserveDialogOpen, setReserveDialog] = useState(false);

  const [guest, setGuest] = useState(0);
  useEffect(() => reset(), [timeSlot]);
  const guestNumberClick = (action: 'up' | 'down') => {
    if (action === 'up') setGuest((prev) => (prev < 9 ? (prev += 1) : prev));
    else setGuest((prev) => (prev > 0 ? (prev -= 1) : prev));
  };

  const onClickTimeSlot = (slot: SlotsType) => {
    setReserveDialog(true);
    setTimeSlot(slot);
  };

  const onClickBook = async () => {
    const data = await mutateAsync({ userId, slotId: timeSlot.slotId });
    const newReservation = data.reservedSlot;

    if (data.isSuccess) {
      updateReservations([...reservations, newReservation]);
      setTimeout(() => {
        setReserveDialog(false);
        reset();
      }, 1000);
    }
  };

  return (
    <div className=' pl-2 pr-2 grid grid-cols-3 md:grid-cols-4 gap-5 justify-between w-full '>
      {slots.map((slot, index) => {
        return isPending ? (
          <Skeleton
            className={buttonVariants({ variant: 'secondary' })}
            key={`${slot.slotId}-${index}`}
          />
        ) : (
          <Dialog
            key={slot.slotId}
            onOpenChange={setReserveDialog}
            open={reserveDialogOpen}>
            <DialogTrigger asChild>
              <Button
                key={slot.slotId}
                className=' text-wrap'
                onClick={() => {
                  onClickTimeSlot(slot);
                }}>
                {moment(slot.time).format('HH:mm DD')}
              </Button>
            </DialogTrigger>

            <DialogContent className='w-3/4 max-h-fit rounded-sm h-1/2'>
              <DialogHeader className='pt-2'>
                <DialogTitle>Complete your reservation</DialogTitle>
                <DialogDescription>
                  Please complete your reservation
                </DialogDescription>
              </DialogHeader>
              {isError ? (
                <div className='w-full flex flex-col items-center gap-6'>
                  <TriangleAlert className=' w-10 h-10 text-red-500' />
                  <span>Failed with reservation</span>
                  <text className=' font-extralight text-xs text-pretty text-center'>
                    contact with support team or try to book different time
                  </text>
                </div>
              ) : (
                <>
                  {isSuccess ? (
                    <div className='w-full flex flex-col items-center gap-6'>
                      <CircleCheckBig className=' w-10 h-10 text-green-500' />
                      <span>Successfully completed!</span>
                    </div>
                  ) : (
                    <div className='flex flex-col gap-5 h-full justify-between '>
                      <div className='flex w-full justify-between'>
                        <span className=' font-bold'>Time:</span>
                        <span>
                          {moment(timeSlot.time).format('HH:mm DD MMM')}
                        </span>
                      </div>
                      <Separator />
                      <div className=' flex items-center h-9 justify-between w-full '>
                        <span className='text-pretty font-bold text-xs w-1/2 '>
                          How many with you?
                        </span>
                        <div className=' flex gap-2 justify-around items-center w-1/2'>
                          <Button
                            variant={'outline'}
                            className='h-4 w-1'
                            onClick={() => guestNumberClick('down')}>
                            -
                          </Button>
                          <span className='font-semibold w-1 text-left'>
                            {guest}
                          </span>
                          <Button
                            variant={'outline'}
                            className='h-4 w-1'
                            onClick={() => guestNumberClick('up')}>
                            +
                          </Button>
                        </div>
                      </div>

                      <div className='w-full flex justify-end gap-2'>
                        <Button variant={'destructive'}>Cancel</Button>
                        <Button onClick={onClickBook}>
                          {isPendingMutation && (
                            <LoaderIcon className='w-4 h-4 animate-spin' />
                          )}
                          Book
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </DialogContent>
          </Dialog>
        );
      })}
    </div>
  );
};

export default Slots;
