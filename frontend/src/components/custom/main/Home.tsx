import { useSlotsStore } from '@/stores/slots-store';
import { DayType } from '@/types/day-types';
import { fakeSlots } from '@/lib/fakers';
import Slots from './Slots';
import Days from './Days';

interface Props {
  days: DayType[];
  isPending: boolean
}

const Home = ({ days, isPending }: Props) => {
  const { slots } = useSlotsStore((state) => state);
  return (
    <div className='flex justify-around pt-2'>
      <Days days={days} isPending={isPending} />
      <Slots slots={isPending ? fakeSlots : slots} isPending={isPending}/>
    </div>
  );
};

export default Home;
