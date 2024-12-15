import { QueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { useSlotsStore } from '@/stores/slots-store';
import { NavBar } from '@/components/custom/NavBar';
import { Toaster } from '@/components/ui/toaster';
import { daysQueryOptions } from '@/lib/api';
import Home from '@/components/custom/Home';
import { useEffect } from 'react';
import {
  createRootRouteWithContext,
  Outlet,
  redirect,
  useLocation,
  useNavigate,
} from '@tanstack/react-router';

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root,
  errorComponent: ({ error }) => {},
  notFoundComponent: () => <>404 not found</>,
  pendingComponent: () => <>Loading....</>,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(daysQueryOptions),
  wrapInSuspense: true,
});

function Root() {
  const location = useLocation();
  const { updateSlots, updateSelectedDayId } = useSlotsStore((state) => state);
  const {
    data: { days },
  } = useSuspenseQuery(daysQueryOptions);

  useEffect(() => {
    updateSelectedDayId(days[0].dayId);
    updateSlots(days[0].slots);
  }, []);

  return (
    <>
      {location.pathname.startsWith('/auth') || <NavBar />}
      {location.pathname.length <= 1 ? <Home days={days} /> : <Outlet />}
      <Toaster />
    </>
  );
}
