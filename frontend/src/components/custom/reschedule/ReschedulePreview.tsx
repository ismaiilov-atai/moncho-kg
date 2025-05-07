import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { useRescheduleStore } from '@/stores/reschedule-store';
import { DialogHeader } from '@/components/ui/dialog';
import { useSlotsStore } from '@/stores/slots-store';
import { RescheduleCard } from './RescheduleCard';
import { Dispatch, SetStateAction } from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { ArrowDown } from 'lucide-react';

interface PageProps {
  onOpenChangeListener: Dispatch<SetStateAction<boolean>>;
}

const ReschedulePreview = ({ onOpenChangeListener }: PageProps) => {
  const { bookingToReschedule } = useRescheduleStore((state) => state);
  const { selectedSlot } = useSlotsStore((state) => state);
  const { t } = useTranslation();

  const onCancel = () => onOpenChangeListener(false);

  return (
    <section className='space-y-10 max-xxs:space-y-8'>
      <DialogHeader className=' text-left'>
        <DialogTitle className=' font-bold text-lg'>
          {t('reschedule')}
        </DialogTitle>
        <DialogDescription className=' text-sm'>
          {t('confirm-reschedule-description')}
        </DialogDescription>
      </DialogHeader>
      <section className='space-y-5 max-xxs:space-y-2 '>
        <RescheduleCard reservation={bookingToReschedule} />
        <ArrowDown className='mx-auto text-primary' size={50} />
        <RescheduleCard changeTo={selectedSlot} />
      </section>
      <section className='flex justify-end w-full space-x-4 max-xxs:[&>button]:h-8'>
        <Button onClick={onCancel} variant='outline'>
          {t('cancel')}
        </Button>
        <Button>{t('verify')}</Button>
      </section>
    </section>
  );
};

export default ReschedulePreview;
