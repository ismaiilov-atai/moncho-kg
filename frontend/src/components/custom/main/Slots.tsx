import { SlotType } from '@/types/day-types';
import { Button, buttonVariants } from '../../ui/button';
import moment from 'moment';
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
  slots: SlotType[];
  isPanding: boolean;
}

const Slots = ({ slots, isPanding }: Props) => {
  return (
    <div className=' pl-2 pr-2 grid grid-cols-3 md:grid-cols-4 gap-5 justify-between w-full '>
      {slots.map((slot, index) => {
        return isPanding ? (
          <Skeleton
            className={buttonVariants({ variant: 'secondary' })}
            key={`${slot.slotId}${index}`}
          />
        ) : (
          <Button key={slot.slotId} className=' text-wrap'>
            {moment(slot.time).utcOffset(0).format('HH:mm DD')}
          </Button>
        );
      })}
    </div>
  );
};

export default Slots;
