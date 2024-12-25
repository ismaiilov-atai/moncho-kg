import { createLazyFileRoute } from '@tanstack/react-router';
import Upcoming from '@/components/custom/main/Upcoming';
import Home from '@/components/custom/main/Home';
import NoData from '@/components/custom/NoData';

export const Route = createLazyFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const days = Route.useLoaderData();
  if (days.length <= 0) return <NoData />;
  return (
    <div className=' flex flex-col gap-10'>
      <Home days={days} isPending={false} />
      <Upcoming />
    </div>
  );
}
