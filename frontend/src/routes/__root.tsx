import { NavBar } from '@/components/custom/NavBar';
import { QueryClient } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import {
  createRootRouteWithContext,
  Outlet,
  useLocation,
} from '@tanstack/react-router';

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
    </>
  );
}
