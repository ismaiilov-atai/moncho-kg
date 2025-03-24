import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { createLazyFileRoute } from '@tanstack/react-router';
import Days from '@/components/custom/main/Days';
import moment from 'moment-timezone';

export const Route = createLazyFileRoute('/book-session/')({
  component: RouteComponent,
});

function RouteComponent() {
  const days = Route.useLoaderData();
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
