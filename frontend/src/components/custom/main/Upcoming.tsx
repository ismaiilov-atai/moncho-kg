import { Edit2, MoreHorizontalIcon, X } from 'lucide-react';
import { useUserStore } from '@/stores/user-store';
import moment from 'moment-timezone';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const Upcoming = () => {
  const { reservations } = useUserStore((state) => state);
  return (
    <div className=' p-2'>
      <div className=' text-xl font-extrabold'>
        {reservations.length > 0 && reservations.length} Reservations
      </div>
      <div className='h-[400px] overflow-scroll space-y-2'>
        {reservations.length ? (
          reservations.map((slot, index) => (
            <div
              key={slot.bookingId || '' + index}
              className=' p-3 h-16 bg-secondary/60 rounded-sm flex flex-col relative animate-quote-slide-down'>
              <span className=' font-bold font-mono text-blue-300'>
                {moment(slot.when).format('HH:mm MM/DD')}
              </span>
              <span className=' text-xs font-extralight font-mono'>
                with you: {slot.withYou}
              </span>

              <span className=' font-extrabold text-4xl text-gray-300 font-sarif absolute right-10 '>
                {index + 1}
              </span>

              <Popover>
                <PopoverTrigger
                  asChild
                  className=' absolute right-2 top-2 bg-secondary/10 rounded-xs hover:bg-secondary h-5'>
                  <MoreHorizontalIcon />
                </PopoverTrigger>
                <PopoverContent
                  className=' flex flex-col w-40 space-y-3 p-2'
                  side='left'>
                  <div className=' flex space-x-2 items-center justify-between bg-secondary p-2 rounded-md hover:bg-secondary/70'>
                    <Edit2 width={18} height={18} />
                    <span>Reschedule</span>
                  </div>
                  <div className=' flex space-x-2 items-center justify-between bg-red-500/40 p-2 rounded-md hover:bg-red-500/70'>
                    <X width={20} height={20} />

                    <span className=' text-right text-pretty text-sm'>
                      Cancel reservation
                    </span>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          ))
        ) : (
          <>No reservation</>
        )}
      </div>
    </div>
  );
};

export default Upcoming;
