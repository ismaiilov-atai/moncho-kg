import { useRescheduleStore } from '@/stores/reschedule-store';
import { Calendar, MoreVertical, X } from 'lucide-react';
import { BookingType } from '@server/types/reservation';
import { cn } from '@/lib/utils';
import moment from 'moment';

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover';

interface Props {
  booking: BookingType;
  onReschedule: (booking: BookingType) => void;
}

const UpcomingCard = ({ booking, onReschedule }: Props) => {
  const {
    updateIsRescheduling,
    isRescheduling,
    bookingToReschedule,
    updateBookingToReschedule,
  } = useRescheduleStore((state) => state);

  const onRescheduleCancel = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.preventDefault();
    updateIsRescheduling(false);
    updateBookingToReschedule({} as BookingType);
  };

  return (
    <div
      key={booking.bookingId || booking.when}
      className={cn(
        ' p-3 h-16 bg-secondary/60 rounded-sm flex flex-col relative animate-quote-slide-down',
        {
          'invisible translate-y-10':
            isRescheduling &&
            booking.bookingId !== bookingToReschedule.bookingId,
          'translate-y-1 ease-in duration-75':
            booking.bookingId === bookingToReschedule.bookingId,
        }
      )}>
      <span className=' font-bold font-mono text-blue-300'>
        {moment(booking.when).format('HH:mm MM/DD')}
      </span>
      <span className=' text-xs font-extralight font-mono'>
        with you: {booking.withYou}
      </span>

      <Popover>
        <PopoverTrigger className=' absolute right-2 top-2 bg-secondary/10 rounded-xs hover:bg-secondary h-5'>
          {isRescheduling ? (
            <X onClick={onRescheduleCancel} className=' text-red-700' />
          ) : (
            <MoreVertical />
          )}
        </PopoverTrigger>
        <PopoverContent
          className=' z-10 border border-secondary rounded-sm'
          side='left'>
          <PopoverClose className=' flex flex-col space-y-3 p-2 bg-white rounded-sm'>
            <div
              onClick={() => onReschedule(booking)}
              className=' text-xs flex w-full space-x-2 items-center justify-between bg-secondary p-2 rounded-sm hover:bg-secondary/70'>
              <Calendar width={12} height={12} />
              <span>Reschedule</span>
            </div>

            <div
              className=' text-xs flex space-x-2 items-center justify-between bg-red-500 p-2 rounded-sm hover:bg-red-500/70 w-full'
              onClick={() => updateIsRescheduling(false)}>
              <X className=' text-white' width={12} height={12} />
              <span className='w-full text-right text-pretty text-white'>
                Cancel
              </span>
            </div>
          </PopoverClose>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default UpcomingCard;
