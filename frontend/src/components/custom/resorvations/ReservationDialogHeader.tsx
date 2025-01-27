import { useRescheduleStore } from '@/stores/reschedule-store';
import { DialogDescription, DialogHeader, DialogTitle } from '../../ui/dialog';

const ReservationDialogHeader = () => {
  const isRescheduling = useRescheduleStore((state) => state.isRescheduling);
  return (
    <DialogHeader className='text-left'>
      <DialogTitle>
        {isRescheduling ? 'Rescheduling' : 'Reservation'}
      </DialogTitle>
      <DialogDescription>
        {isRescheduling
          ? 'Complete your rescheduling'
          : 'Please complete your reservation'}
      </DialogDescription>
    </DialogHeader>
  );
};

export default ReservationDialogHeader;
