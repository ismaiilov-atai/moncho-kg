import { Button, buttonVariants } from '../../ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { SlotType } from '@/types/day-types';
import moment from 'moment';

interface Props {
  slots: SlotType[];
  isPending: boolean;
}

const Slots = ({ slots, isPending }: Props) => {
  return (
    <div className=' pl-2 pr-2 grid grid-cols-3 md:grid-cols-4 gap-5 justify-between w-full '>
      {slots.map((slot, index) => {
        return isPending ? (
          <Skeleton
            className={buttonVariants({ variant: 'secondary' })}
            key={`${slot.slotId}-${index}`}
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
