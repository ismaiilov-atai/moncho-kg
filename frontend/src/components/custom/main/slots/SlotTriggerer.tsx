import { DialogTrigger } from '@/components/ui/dialog';
import { useSlotsStore } from '@/stores/slots-store';
import { useNavigate } from '@tanstack/react-router';
import { useUserStore } from '@/stores/user-store';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { SlotsType } from '@/types/day';
import { Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import moment from 'moment';

interface PageProps {
  slot: SlotsType;
  setReserveDialogState: Dispatch<SetStateAction<boolean>>;
}

const SlotTriggerer = ({ slot, setReserveDialogState }: PageProps) => {
  const { updateSelectedSlot } = useSlotsStore((state) => state);
  const { phoneNumber, userId } = useUserStore((state) => state);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onClickTimeSlot = (slot: SlotsType) => {
    updateSelectedSlot(slot);
    if (userId && phoneNumber) setReserveDialogState(true);
    else navigate({ to: '/signup' });
  };

  const timePassed = (time: string): boolean => {
    return moment(time).isBefore(moment(), 'hour');
  };

  return (
    <DialogTrigger asChild>
      <Card
        key={`_${slot.slotId}`}
        id={`_${slot.slotId}`}
        onClick={() => onClickTimeSlot(slot)}
        className={cn(
          'h-16 justify-center flex flex-col p-3 border-muted rounded-sm shadow-sm hover:bg-accent/30',
          { 'pointer-events-none hidden': timePassed(slot.time) }
        )}>
        <p className=' font-roboto text-lg'>
          {moment(slot.time).format('HH:mm')}
          <span> - </span>
          {moment(slot.time).add(1.25, 'hours').format('HH:mm')}
        </p>
        <p className='text-muted-foreground text-sm flex items-center space-x-2'>
          <Users size={16} />
          <span>10 {t('of')} 10</span>
        </p>
      </Card>
    </DialogTrigger>
  );
};

export default SlotTriggerer;
