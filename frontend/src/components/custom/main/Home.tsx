import { useRescheduleStore } from '@/stores/reschedule-store';
import { useSlotsStore } from '@/stores/slots-store';
import { DaysType } from '@/types/day';
import { fakeSlots } from '@/lib/fakers';
import Slots from './Slots';
import Days from './Days';
import { cn } from '@/lib/utils';

interface Props {
  days: DaysType[];
  isPending: boolean;
}

const Home = ({ days, isPending }: Props) => {
  const { slots } = useSlotsStore((state) => state);
  const { isRescheduling } = useRescheduleStore((state) => state);
  return (
    <div
      className={cn('flex justify-around pt-2', {
        'animate-shake ': isRescheduling,
      })}>
      <Days days={days} isPending={isPending} />
      <Slots slots={isPending ? fakeSlots : slots} isPending={isPending} />
    </div>
  );
};

export default Home;
