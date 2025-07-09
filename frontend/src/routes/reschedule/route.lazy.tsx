import SlotsReschedule from '@/components/custom/main/slots/SlotsReschedule';
import SevenDaysRangeHeader from '@/components/custom/SevenDaysRangeHeader';
import { createLazyFileRoute } from '@tanstack/react-router';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { useSlotsStore } from '@/stores/slots-store';
import { fakeDays, fakeSlots } from '@/lib/fakers';
import Days from '@/components/custom/main/Days';
import { useTranslation } from 'react-i18next';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import NoData from '@/components/custom/NoData';

export const Route = createLazyFileRoute('/reschedule')({
  component: RescheduleComponent,
});

export function RescheduleComponent({ isLoading }: { isLoading: boolean }) {
  const { days = [], error } = Route.useLoaderData();
  const { slots } = useSlotsStore((state) => state);
  const { t } = useTranslation();
  if (error) return <NoData />;
  return (
    <section className='sm:p-2 h-full w-full'>
      <section>
        <CardTitle className=' font-arbutus font-light text-lg'>
          {t('reschedule-title')}
        </CardTitle>
        <CardDescription>{t('reschedule-description')}</CardDescription>
      </section>
      <Card className='pb-3 max-sm:fixed max-sm:right-0 max-sm:left-0 max-sm:rounded-none max-sm:border-none max-sm:shadow-none'>
        <CardHeader className='px-1 flex space-y-6 bg-primary-foreground m-1'>
          <SevenDaysRangeHeader isPending={isLoading} days={days} />
          <Days days={isLoading ? fakeDays : days} isPending={isLoading} />
          <Separator className=' w-full md:w-[80%] self-center bg-muted h-[1px]' />
        </CardHeader>
        <CardContent className='h-full overflow-scroll '>
          <SlotsReschedule
            slots={isLoading ? fakeSlots : slots}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </section>
  );
}
