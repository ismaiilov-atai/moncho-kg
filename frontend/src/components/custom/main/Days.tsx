import { Button, buttonVariants } from '../../ui/button';
import { useSlotsStore } from '@/stores/slots-store';
import { Skeleton } from '@/components/ui/skeleton';
import { DaysType } from '@/types/day';
import moment from 'moment-timezone';
import { cn } from '@/lib/utils';

interface Props {
  days: DaysType[];
  isPending: boolean;
}

const Days = ({ days, isPending }: Props) => {
  const { updateSlots, updateSelectedDayId, selectedDayId } = useSlotsStore(
    (state) => state
  );

  const onClick = (day: DaysType) => {
    updateSlots(day.slots);
    updateSelectedDayId(day.dayId);
  };

  const selectDay = (dayId: string): boolean => selectedDayId === dayId;

  return (
    <div className='w-full md:w-[80%] self-center justify-around max-xs:gap-0 gap-2 flex'>
      {days.map((day, index) => {
        return isPending ? (
          <Skeleton
            className={buttonVariants({ variant: 'link' })}
            key={`${index}-${day.dayId}`}
          />
        ) : (
          <Button
            id={`_${day.dayId}`}
            key={day.dayId}
            className={cn(
              'flex flex-col gap-0 text-pretty max-w-11 p-1 text-foreground text-xs hover:no-underline hover:bg-accent-foreground/10 rounded-xs [&>span]:m-0  ',
              {
                'bg-accent-foreground/10 text-primary': selectDay(day.dayId),
              }
            )}
            variant={selectDay(day.dayId) ? 'default' : 'link'}
            onClick={() => onClick(day)}>
            <span className=' max-xxs:hidden'>
              {moment(day.day).format('ddd')}
            </span>
            <span className='text-nowrap max-xxs:text-wrap'>
              {moment(day.day).format('DD MMM')}
            </span>
          </Button>
        );
      })}
    </div>
  );
};

export default Days;
