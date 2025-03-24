import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { createLazyFileRoute } from '@tanstack/react-router';
import { Separator } from '@/components/ui/separator';
import { useSlotsStore } from '@/stores/slots-store';
import Slots from '@/components/custom/main/Slots';
import Days from '@/components/custom/main/Days';
import { useTranslation } from 'react-i18next';
import moment from 'moment-timezone';

export const Route = createLazyFileRoute('/book-session')({
  component: RouteComponent,
});

function RouteComponent() {
  const days = Route.useLoaderData();
  const { i18n } = useTranslation();
  const { slots } = useSlotsStore((state) => state);
  moment.locale(i18n.language);
  return (
    <section className='p-2'>
      <Card className='pb-3'>
        <CardHeader className='px-1 flex space-y-6 bg-primary-foreground m-1'>
          <span className=' text-lg font-semibold font-roboto text-center'>
            {moment(days[0].day).format('MMMM DD')}
            <span> - </span>
            {moment(days[0].day).format('MMMM DD, YYYY')}
          </span>
          <Days days={days} isPending={false} />
          <Separator className=' w-full md:w-[80%] self-center' />
        </CardHeader>
        <CardContent className='max-sm:h-[560px] overflow-scroll'>
          <Slots slots={slots} isPending={false} />
        </CardContent>
      </Card>
    </section>
  );
}
