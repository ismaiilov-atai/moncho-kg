import { createLazyFileRoute } from '@tanstack/react-router';
import Home from '@/components/custom/main/Home';

export const Route = createLazyFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const days = Route.useLoaderData();
  return <Home days={days} isPanding={false} />;
}
