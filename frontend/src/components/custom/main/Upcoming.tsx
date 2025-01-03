import { useUserStore } from '@/stores/user-store';
import moment from 'moment-timezone';

const Upcoming = () => {
  const { reservations } = useUserStore((state) => state);
  return (
    <div className=' p-2'>
      <div className=' text-xl font-extrabold'>
        {reservations.length > 0 && reservations.length} Reservations
      </div>
      <div className='h-[400px] overflow-scroll'>
        {reservations.length ? (
          reservations.map((slot, index) => (
            <div
              key={slot.bookingId || '' + index}
              className=' p-3 border-b-2 '>
              {moment(slot.when).format('HH:mm MM/DD')}
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
