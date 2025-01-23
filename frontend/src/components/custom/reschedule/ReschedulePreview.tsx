import { useRescheduleStore } from '@/stores/reschedule-store';
import { useSlotsStore } from '@/stores/slots-store';
import { RescheduleCard } from './RescheduleCard';
import { ArrowBigDown } from 'lucide-react';

interface Props {
  selectedTimeSlotId: string;
}

const ReschedulePreview = ({ selectedTimeSlotId }: Props) => {
  const { bookingToReschedule } = useRescheduleStore((state) => state);
  const { slots } = useSlotsStore((state) => state);
  return (
    <section className='space-y-5'>
      <RescheduleCard time={bookingToReschedule.when} />
      <ArrowBigDown className=' mx-auto' />
      <RescheduleCard
        changingTo
        time={
          slots.find((slot) => slot.slotId === selectedTimeSlotId)?.time || ''
        }
      />
    </section>
  );
};

export default ReschedulePreview;
