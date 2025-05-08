import ReschedulePreview from '../../reschedule/ReschedulePreview';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { RESCHEDULE_INTRO_COUNT } from '@/lib/constants';
import { buttonVariants } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useDaysStore } from '@/stores/days-store';
import { initDriverObj } from '@/lib/driver';
import SlotTriggerer from './SlotTriggerer';
import { useEffect, useState } from 'react';
import { SlotsType } from '@/types/day';
import { cn } from '@/lib/utils';

interface PageProps {
  isLoading: boolean;
  slots: SlotsType[];
}

const SlotsReschedule = ({ isLoading, slots }: PageProps) => {
  const [isDialogOpen, onOpenChangeListener] = useState(false);
  const { days } = useDaysStore((state) => state);

  useEffect(() => {
    const introCount = Number(localStorage.getItem(RESCHEDULE_INTRO_COUNT));
    if (days.length && introCount < 3) {
      initDriverObj([days[0].dayId, slots[0].slotId]).drive();
    }
  }, [days]);

  return (
    <div className='px-2 grid grid-cols-1 sm:grid-cols-2 gap-4 justify-between w-full max-xxs:h-[40vh] max-sm:h-[50vh] h-[55vh]'>
      {slots.map((slot, index) => {
        return isLoading ? (
          <Skeleton
            className={cn(buttonVariants({ variant: 'link' }))}
            key={`${slot.slotId} - ${index}`}
          />
        ) : (
          <Dialog
            key={slot.slotId}
            onOpenChange={(state) => onOpenChangeListener(state)}
            open={isDialogOpen}>
            <SlotTriggerer
              setReserveDialogState={onOpenChangeListener}
              slot={slot}
            />
            <DialogContent className=' w-[90%] rounded-sm'>
              <ReschedulePreview onOpenChangeListener={onOpenChangeListener} />
            </DialogContent>
          </Dialog>
        );
      })}
    </div>
  );
};

export default SlotsReschedule;
