import SlotsReschedule from '@/components/custom/main/slots/SlotsReschedule';
import SevenDaysRangeHeader from '@/components/custom/SevenDaysRangeHeader';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { createLazyFileRoute } from '@tanstack/react-router';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { useSlotsStore } from '@/stores/slots-store';
import { fakeDays, fakeSlots } from '@/lib/fakers';
import Days from '@/components/custom/main/Days';

export const Route = createLazyFileRoute('/reschedule')({
  component: RescheduleComponent,
});

export function RescheduleComponent({ isLoading }: { isLoading: boolean }) {
  const days = Route.useLoaderData();
  const { slots } = useSlotsStore((state) => state);

  return (
    <section className='sm:p-2 space-y-1'>
      <section>
        <CardTitle className=' font-arbutus font-light text-lg'>
          Reschedule a session
        </CardTitle>
        <CardDescription>
          pls use your thing here to charge and do more
        </CardDescription>
      </section>
      <Card className='pb-3 max-sm:fixed max-sm:right-0 max-sm:left-0 max-sm:rounded-none max-sm:border-none max-sm:shadow-none'>
        <CardHeader className='px-1 flex space-y-6 bg-primary-foreground m-1'>
          <SevenDaysRangeHeader isPending={isLoading} days={days} />
          <Days days={isLoading ? fakeDays : days} isPending={isLoading} />
          <Separator className=' w-full md:w-[80%] self-center bg-muted  h-[1px]' />
        </CardHeader>
        <CardContent className='max-sm:h-[70dvh] min-h-[60dvh] overflow-scroll'>
          <SlotsReschedule
            slots={isLoading ? fakeSlots : slots}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </section>
  );
}
