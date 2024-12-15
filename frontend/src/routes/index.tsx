import { createFileRoute } from '@tanstack/react-router';
import { useSlotsStore } from '@/stores/slots-store';
import { Button } from '@/components/ui/button';
import moment from 'moment';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const { slots } = useSlotsStore((state) => state);

  return (
    <div className=' pl-2 pr-2 grid grid-cols-3 md:grid-cols-4 gap-5 justify-between w-full '>
      {slots.map((slot) => (
        <Button key={slot.slotId} className=' text-wrap'>
          {moment(slot.time).utcOffset(0).format('HH:mm DD')}
        </Button>
      ))}
    </div>
  );
}
