import { createLazyFileRoute } from '@tanstack/react-router';
import Home from '@/components/custom/main/Home';
import NoData from '@/components/custom/NoData';

export const Route = createLazyFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const days = Route.useLoaderData();

  if (days.length <= 0) return <NoData />;

  return <Home days={days} isPending={false} />;
}
