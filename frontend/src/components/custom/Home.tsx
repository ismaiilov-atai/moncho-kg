import { useSlotsStore } from '@/stores/slots-store';
import { Outlet } from '@tanstack/react-router';
import { DayType } from '@/types/day-types';
import { Button } from '../ui/button';
import moment from 'moment';

interface Props {
  days: DayType[];
}

const Home = ({ days }: Props) => {
  const { updateSlots, updateSelectedDayId, selectedDayId } = useSlotsStore(
    (state) => state
  );

  const onClick = (day: DayType) => {
    updateSlots(day.slots);
    updateSelectedDayId(day.dayId);
  };
  const selectDay = (dayId: string): boolean => {
    return selectedDayId === dayId;
  };

  return (
    <div className='flex w-full h-96 pt-2'>
      <div className='w-20 justify-between flex flex-col border-r-2 pl-2 pr-2 '>
        {days.map((item) => (
          <Button
            variant={selectDay(item.dayId) ? 'default' : 'secondary'}
            key={item.dayId}
            onClick={() => onClick(item)}>
            {moment(item.day).utcOffset(0).format('DD MMM')}
          </Button>
        ))}
      </div>
      <Outlet />
    </div>
  );
};

export default Home;
