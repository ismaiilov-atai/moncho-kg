import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { createLazyFileRoute } from '@tanstack/react-router';
import Days from '@/components/custom/main/Days';
import moment from 'moment-timezone';
import { useTranslation } from 'react-i18next';

export const Route = createLazyFileRoute('/book-session')({
  component: RouteComponent,
});

function RouteComponent() {
  const days = Route.useLoaderData();
  const { i18n } = useTranslation();
  moment.locale(i18n.language);
  return (
    <section className='p-2'>
      <Card>
        <CardHeader className='px-1 flex space-y-6'>
          <span className=' text-lg font-semibold font-roboto text-center'>
            {moment(days[0].day).format('MMM DD')}
            <span> - </span>
            {moment(days[0].day).format('MMM DD, YYYY')}
          </span>
          <Days days={days} isPending={false} />
        </CardHeader>
        <CardContent>one</CardContent>
      </Card>
    </section>
  );
}
