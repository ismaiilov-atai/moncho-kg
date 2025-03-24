import { ChevronRight } from 'lucide-react';
import moment from 'moment';

import { useUserStore } from '@/stores/user-store';
import { Separator } from '@/components/ui/separator';

const UpcomingCard = () => {
  const { reservations } = useUserStore((state) => state);

  return reservations.map((reservation, index) => {
    return (
      <section
        className='space-y-1 hover:bg-accent/20 rounded-sm '
        key={`${reservation.bookingId}_${index}`}>
        <div className='flex w-full justify-between items-center p-2'>
          <span>
            <p className='text-lg font-roboto font-semibold'>{`${moment(reservation.when).format('HH:mm')} - ${moment(reservation.when).add(1.15, 'hours').format('HH:mm')} `}</p>
            <span className='text-muted-foreground'>
              {moment(reservation.when).format('ddd, MMM DD, YYYY')}
            </span>
          </span>
          <ChevronRight />
        </div>
        {index < reservations.length - 1 && <Separator />}
      </section>
    );
  });
};

export default UpcomingCard;
