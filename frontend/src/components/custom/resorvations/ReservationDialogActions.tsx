import ReschedulePreview from '../reschedule/ReschedulePreview';
import { useRescheduleStore } from '@/stores/reschedule-store';
import { Separator } from '@radix-ui/react-separator';
import { Loader2Icon } from 'lucide-react';
import { Button } from '../../ui/button';
import { SlotsType } from '@/types/day';
import { FormEvent } from 'react';
import moment from 'moment';

interface Props {
  onSubmitAction: (e: FormEvent<HTMLFormElement>) => void;
  onCancel: (e: FormEvent<HTMLButtonElement>) => void;
  selectedTimeSlot: SlotsType;
  guest: number;
  guestNumberClick: (action: 'up' | 'down') => void;
  isPending: boolean;
}

const ReservationDialogActions = ({
  onSubmitAction,
  onCancel,
  selectedTimeSlot,
  guest,
  guestNumberClick,
  isPending,
}: Props) => {
  const { isRescheduling } = useRescheduleStore((state) => state);

  return (
    <>
      <div className='flex flex-col gap-5 h-full justify-between '>
        {isRescheduling ? (
          <ReschedulePreview selectedTimeSlotId={selectedTimeSlot.slotId} />
        ) : (
          <>
            <div className=' flex justify-between'>
              <span className='font-serif'>Space left:</span>
              <span>{selectedTimeSlot.spaceLeft - (guest + 1)}</span>
            </div>
            <Separator />
            <div className='flex w-full justify-between'>
              <span className=' font-semibold'>Time:</span>
              <span>
                {moment(selectedTimeSlot.time).format('HH:mm DD MMM')}
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
                  className='h-4 w-1 rounded-xs'
                  onClick={() => guestNumberClick('down')}>
                  -
                </Button>
                <span className='font-semibold w-1 text-left'>{guest}</span>
                <Button
                  variant={'outline'}
                  className='h-4 w-1 rounded-xs'
                  onClick={() => guestNumberClick('up')}>
                  +
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
      <form
        onSubmit={(e) => onSubmitAction(e)}
        className='w-full flex justify-end gap-2 items-end'>
        <Button variant={'destructive'} onClick={(e) => onCancel(e)}>
          Cancel
        </Button>

        <Button type='submit' disabled={isPending}>
          {isRescheduling ? 'Reschedule' : 'Book'}
          {isPending && (
            <Loader2Icon className=' absolute mx-auto animate-spin text-black' />
          )}
        </Button>
      </form>
    </>
  );
};

export default ReservationDialogActions;
