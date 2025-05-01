import { Button, buttonVariants } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useSlotsStore } from '@/stores/slots-store';
import { SlotsType } from '@/types/day';
import SlotTriggerer from './SlotTriggerer';
import { useState } from 'react';

interface PageProps {
  isLoading: boolean;
  slots: SlotsType[];
}

const SlotsReschedule = ({ isLoading, slots }: PageProps) => {
  const { selectedSlot } = useSlotsStore((state) => state);
  const [isDialogOpen, onOpenChangeListener] = useState(false);
  return (
    <div className=' pl-2 pr-2 grid grid-cols-1 sm:grid-cols-2 gap-4 justify-between w-full h-full'>
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
            open={Object.hasOwn(selectedSlot, 'time') || isDialogOpen}>
            <SlotTriggerer
              setReserveDialogState={onOpenChangeListener}
              slot={slot}
            />
            <DialogContent className=' w-[90%] max-h-fit max-xs:h-[80%] rounded-sm h-1/2 '>
              {/* <ReservationDialogHeader />
              <ReservationDialogActions
                onSubmitAction={onBoookAction}
                onCancel={onCancel}
                guest={guest}
                guestNumberClick={guestNumberClick}
                selectedTimeSlot={selectedSlot}
                isPending={false}
              /> */}
            </DialogContent>
          </Dialog>
        );
      })}
    </div>
  );
};

export default SlotsReschedule;
