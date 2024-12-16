import { useSlotsStore } from '@/stores/slots-store';
import { DayType, SlotType } from '@/types/day-types';
import Slots from './Slots';
import Days from './Days';
import { fakeSlots } from '@/lib/fakers';

interface Props {
  days: DayType[];
  isPanding: boolean;
}

const Home = ({ days, isPanding }: Props) => {
  const { slots } = useSlotsStore((state) => state);
  return (
    <div className='flex justify-around pt-2'>
      <Days days={days} isPanding={isPanding} />
      <Slots slots={isPanding ? fakeSlots : slots} isPanding={isPanding} />
    </div>
  );
};

export default Home;
