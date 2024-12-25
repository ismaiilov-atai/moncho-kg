import { useUserStore } from '@/stores/user-store';
import moment from 'moment';

const Upcoming = () => {
  const { reservations } = useUserStore((state) => state);
  return (
    <div className=' p-2'>
      <div className=' text-xl font-extrabold'>
        {reservations.length > 0 && reservations.length} Reservations
      </div>
      {reservations.length ? (
        reservations.map((slot, index) => (
          <div key={slot.slotId || '' + index} className=' p-3 border-b-2 '>
            {moment(slot.time).format('HH:mm MM/DD')}
          </div>
        ))
      ) : (
        <>No reservation</>
      )}
    </div>
  );
};

export default Upcoming;
