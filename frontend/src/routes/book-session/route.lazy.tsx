import SevenDaysRangeHeader from '@/components/custom/SevenDaysRangeHeader';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { createLazyFileRoute } from '@tanstack/react-router';
import { Separator } from '@/components/ui/separator';
import { useSlotsStore } from '@/stores/slots-store';
import Slots from '@/components/custom/main/Slots';
import { fakeDays, fakeSlots } from '@/lib/fakers';
import Days from '@/components/custom/main/Days';
import { useTranslation } from 'react-i18next';
import moment from 'moment-timezone';

interface PageProps {
  isPending?: boolean;
}

export const Route = createLazyFileRoute('/book-session')({
  component: BookSessionComponent,
});

export function BookSessionComponent({ isPending }: PageProps) {
  const days = Route.useLoaderData();
  const { i18n } = useTranslation();
  const { slots } = useSlotsStore((state) => state);
  moment.locale(i18n.language);
  return (
    <section className='sm:p-2'>
      <Card className='pb-3 max-sm:fixed max-sm:right-0 max-sm:left-0 max-sm:rounded-none max-sm:border-none max-sm:shadow-none'>
        <CardHeader className='px-1 flex space-y-6 bg-primary-foreground m-1'>
          <SevenDaysRangeHeader isPending={isPending} days={days} />
          <Days days={isPending ? fakeDays : days} isPending={isPending} />
          <Separator className=' w-full md:w-[80%] self-center' />
        </CardHeader>
        <CardContent className='max-sm:h-[65dvh] min-h-[60dvh] overflow-scroll'>
          <Slots slots={isPending ? fakeSlots : slots} isPending={isPending} />
        </CardContent>
      </Card>
    </section>
  );
}
