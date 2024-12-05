import { NavBar } from '@/components/custom/NavBar';
import { Toaster } from '@/components/ui/toaster';

import { QueryClient } from '@tanstack/react-query';
import {
  createRootRouteWithContext,
  Outlet,
  useLocation,
} from '@tanstack/react-router';
// import { TanStackRouterDevtools } from '@tanstack/router-devtools';

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root,
});

function Root() {
  const location = useLocation();
  return (
    <>
      {location.pathname.startsWith('/auth') || <NavBar />}
      <Outlet />
      <Toaster />
      {/* <TanStackRouterDevtools /> */}
    </>
  );
}
