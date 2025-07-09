import SevenDaysRangeHeader from '@/components/custom/SevenDaysRangeHeader';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { createLazyFileRoute } from '@tanstack/react-router';
import Slots from '@/components/custom/main/slots/Slots';
import { useStripeStore } from '@/stores/stripe-store';
import { Separator } from '@/components/ui/separator';
import StripeClient from '@/components/StripeClient';
import { useSlotsStore } from '@/stores/slots-store';
import { fakeDays, fakeSlots } from '@/lib/fakers';
import Days from '@/components/custom/main/Days';
import NoData from '@/components/custom/NoData';
import { useTranslation } from 'react-i18next';
import moment from 'moment-timezone';

interface PageProps {
  isPending?: boolean;
}

export const Route = createLazyFileRoute('/book-session')({
  component: BookSessionComponent,
});

export function BookSessionComponent({ isPending }: PageProps) {
  const data = Route.useLoaderData();
  const { i18n } = useTranslation();
  const { slots } = useSlotsStore((state) => state);
  const { clientSecret } = useStripeStore((state) => state);
  moment.locale(i18n.language);

  if (data?.error) return <NoData />;
  if (clientSecret) return <StripeClient clientSecret={clientSecret} />;

  return (
    <section className='sm:px-2'>
      <Card className='pb-2 max-sm:fixed max-sm:right-0 max-sm:left-0 max-sm:rounded-none max-sm:border-none max-sm:shadow-none'>
        <CardHeader className='px-1 flex space-y-4 bg-primary-foreground m-1'>
          <SevenDaysRangeHeader isPending={isPending} days={data?.days} />
          <Days
            days={isPending ? fakeDays : data?.days}
            isPending={isPending}
          />
          <Separator className=' w-full md:w-[80%] self-center' />
        </CardHeader>
        <CardContent className='max-sm:h-[65dvh] max-sm:pb-12  min-h-[60dvh] overflow-scroll'>
          <Slots slots={isPending ? fakeSlots : slots} isPending={isPending} />
        </CardContent>
      </Card>
    </section>
  );
}
