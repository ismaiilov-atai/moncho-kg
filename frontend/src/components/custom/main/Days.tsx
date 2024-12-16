import { Button, buttonVariants } from '../../ui/button';
import { useSlotsStore } from '@/stores/slots-store';
import { Skeleton } from '@/components/ui/skeleton';
import { Outlet } from '@tanstack/react-router';
import { DayType } from '@/types/day-types';
import moment from 'moment';

interface Props {
  days: DayType[];
  isPanding: boolean;
}

const Days = ({ days, isPanding }: Props) => {
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
    <div className='flex w-24'>
      <div className='w-20 justify-between gap-2 flex flex-col border-r-2 pl-2 pr-2 '>
        {days.map((day, index) => {
          return isPanding ? (
            <Skeleton
              className={buttonVariants({ variant: 'secondary' })}
              key={`${day.dayId}${index}`}
            />
          ) : (
            <Button
              variant={selectDay(day.dayId) ? 'default' : 'secondary'}
              key={day.dayId}
              onClick={() => onClick(day)}>
              {moment(day.day).utcOffset(0).format('DD MMM')}
            </Button>
          );
        })}
      </div>
      <Outlet />
    </div>
  );
};

export default Days;
