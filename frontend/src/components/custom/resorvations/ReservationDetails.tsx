import { BookingType } from '@server/types/reservation';
import { useTranslation } from 'react-i18next';
import { SlotsType } from '@/types/day';
import moment from 'moment';

interface PageProps {
  booking?: BookingType;
  selectedSlot?: SlotsType;
}

const ReservationDetails = ({ booking, selectedSlot }: PageProps) => {
  const { t } = useTranslation();
  return (
    <section className=' space-y-3'>
      <div className=' text-foreground font-semibold'>{t('date-time')}</div>
      <div className=' text-muted-foreground text-sm'>
        {moment(selectedSlot ? selectedSlot.time : booking!.when).format(
          `dddd DD-MMMM, YYYY`
        )}
      </div>
      <span className='text-primary text-sm'>
        {moment(selectedSlot ? selectedSlot.time : booking!.when).format(
          `HH:mm`
        )}
      </span>
      <span className='text-primary'> - </span>
      <span className='text-primary text-sm'>
        {moment(selectedSlot ? selectedSlot.time : booking!.when)
          .add(1, 'hours')
          .format('HH:mm')}
      </span>
    </section>
  );
};

export default ReservationDetails;
