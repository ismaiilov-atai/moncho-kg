import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { useRescheduleStore } from '@/stores/reschedule-store';
import { Dispatch, FormEvent, SetStateAction } from 'react';
import { DialogHeader } from '@/components/ui/dialog';
import { ArrowDown, CheckCircle } from 'lucide-react';
import { useSlotsStore } from '@/stores/slots-store';
import { useNavigate } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import { useUserStore } from '@/stores/user-store';
import { RescheduleCard } from './RescheduleCard';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import SubmitButton from '../SubmitButton';
import { toast } from '@/hooks/use-toast';
import { api } from '@/lib/api';
import moment from 'moment';

interface PageProps {
  onOpenChangeListener: Dispatch<SetStateAction<boolean>>;
}

const ReschedulePreview = ({ onOpenChangeListener }: PageProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { selectedSlot } = useSlotsStore((state) => state);
  const { bookingToReschedule } = useRescheduleStore((state) => state);
  const { updateRescheduledResorvation } = useUserStore((state) => state);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: api.reserve.$put,
  });

  const onCancel = () => onOpenChangeListener(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await mutateAsync({
        json: {
          from: bookingToReschedule.bookingId!,
          to: selectedSlot.slotId,
        },
      });

      const result = await response.json();
      updateRescheduledResorvation(result.reservation);
      toast({
        title: (
          <div className='flex items-center space-x-2'>
            <CheckCircle className=' text-green-600' />
            <span className='font-semibold'>{t('reschedule-success')}</span>
          </div>
        ) as unknown as string,
        description: `${t('your-new')}: ${moment(result.reservation.when).format('MMM DD, HH:mm')}`,
      });
      navigate({ to: '/' });
    } catch (error) {
      toast({
        title: t('smth-went-wrong'),
        description: t('try-reschedule-again'),
        variant: 'destructive',
      });
    }
  };

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
        <form onSubmit={onSubmit}>
          <SubmitButton
            title={t('verify')}
            loading={isPending}
            disabled={isPending}
            className='w-10/12'
          />
        </form>
      </section>
    </section>
  );
};

export default ReschedulePreview;
