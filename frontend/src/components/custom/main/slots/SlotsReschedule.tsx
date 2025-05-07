import ReschedulePreview from '../../reschedule/ReschedulePreview';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { buttonVariants } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import SlotTriggerer from './SlotTriggerer';
import { SlotsType } from '@/types/day';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface PageProps {
  isLoading: boolean;
  slots: SlotsType[];
}

const SlotsReschedule = ({ isLoading, slots }: PageProps) => {
  const [isDialogOpen, onOpenChangeListener] = useState(false);
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
