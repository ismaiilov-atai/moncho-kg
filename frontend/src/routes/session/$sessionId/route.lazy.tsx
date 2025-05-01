import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useRescheduleStore } from '@/stores/reschedule-store';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import moment from 'moment-timezone';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const Route = createLazyFileRoute('/session/$sessionId')({
  component: RouteComponent,
});

function RouteComponent() {
  const reservation = Route.useLoaderData();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { updateIsRescheduling } = useRescheduleStore((state) => state);
  const onReschedule = () => {
    updateIsRescheduling(true);
    navigate({
      to: '/reschedule',
    });
  };

  return (
    <Card className='mt-5 '>
      <CardHeader>
        <CardTitle className=' font-arbutus'>{t('session-details')}</CardTitle>
        <CardDescription>{t('session-details-desc')}</CardDescription>
      </CardHeader>
      <CardContent className=' space-y-10'>
        <section className=' space-y-2'>
          <b>{t('date-time')}</b>
          <div className=' text-sm'>
            {moment(reservation.when).format(`dddd, DD MMMM, YYYY`)}
          </div>
          <div className=' text-sm text-primary'>
            {moment(reservation.when).format(`HH:mm`)}
            <span className='px-1'>-</span>
            {moment(reservation.when).add(1, 'hour').format(`HH:mm`)}
          </div>
        </section>
        <section className=' space-y-2'>
          <b>{t('duration')}</b>
          <div className=' text-sm'>1 {t('hour')}</div>
        </section>
        <section className=' space-y-2'>
          <b>{t('how-many-guest')}</b>
          <div className=' text-sm'>{reservation.withYou}</div>
        </section>
        <form onSubmit={onReschedule} className=' w-full text-right'>
          <Button className='max-md:[40%] md:w-[30%]'>{t('reschedule')}</Button>
        </form>
      </CardContent>
    </Card>
  );
}
