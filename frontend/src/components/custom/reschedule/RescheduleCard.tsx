import { BookingType } from '@server/types/reservation';
import { useTranslation } from 'react-i18next';
import { SlotsType } from '@/types/slot';
import { cn } from '@/lib/utils';
import moment from 'moment';

interface Props {
  reservation?: BookingType;
  changeTo?: SlotsType;
}

export const RescheduleCard = ({ reservation, changeTo }: Props) => {
  const { t } = useTranslation();
  return (
    <section
      className={cn(
        'flex flex-col space-y-3 bg-red-50 rounded-md p-2 text-left max-xxs:text-xs',
        { 'bg-green-50/80': changeTo }
      )}>
      <span
        className={cn('w-full font-bold font-playfair text-red-600', {
          'text-green-600': changeTo,
        })}>
        {changeTo ? t('new') : t('old')}
      </span>
      <section className='flex flex-col'>
        <span className=' font-bold'>{t('date-time')}</span>
        <span className=' w-full '>
          {moment(reservation ? reservation.when : changeTo?.time).format(
            'MMM DD HH:mm'
          )}
        </span>
      </section>
      <section className='flex flex-col'>
        <span
          className={cn(' font-bold', {
            'text-xs text-muted-foreground': changeTo,
          })}>
          {t(changeTo ? 'guest-number-unchanged' : 'how-many-guest')}
        </span>
        <span>{reservation && reservation.withYou}</span>
      </section>
    </section>
  );
};
