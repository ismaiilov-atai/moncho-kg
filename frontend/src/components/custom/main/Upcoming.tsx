import { useRescheduleStore } from '@/stores/reschedule-store';
import { BookingType } from '@server/types/reservation';
import { useSlotsStore } from '@/stores/slots-store';
import { useUserStore } from '@/stores/user-store';
import { initDriverObj } from '@/lib/driver';
import UpcomingCard from './UpcomingCard';
import { cn } from '@/lib/utils';

const Upcoming = () => {
  const { reservations } = useUserStore((state) => state);
  const { selectedDayId, slots } = useSlotsStore((state) => state);
  const { isRescheduling, updateIsRescheduling, updateBookingToReschedule } =
    useRescheduleStore((state) => state);

  const onReschedule = (booking: BookingType) => {
    updateBookingToReschedule(booking);
    updateIsRescheduling(true);

    initDriverObj([
      selectedDayId,
      slots[slots.length - 3 ? slots.length - 3 : 0].slotId,
    ]).drive();
  };

  return (
    <div className=' p-2 space-y-3'>
      <div
        className={cn('text-xl font-extrabold', {
          'animate-shake': isRescheduling,
        })}>
        <span className={`${isRescheduling && ' text-red-400'}`}>
          {isRescheduling ? 'Rescheduling' : 'Reservations'}
        </span>
      </div>
      <div className='h-[400px] overflow-scroll space-y-2'>
        {reservations.map((booking) => (
          <UpcomingCard
            key={booking.bookingId}
            booking={booking}
            onReschedule={onReschedule}
          />
        ))}
      </div>
    </div>
  );
};

export default Upcoming;
