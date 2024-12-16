import { JwtTokenExpired, JwtTokenInvalid } from 'hono/utils/jwt/types';
import { QueryClient } from '@tanstack/react-query';
import { NavBar } from '@/components/custom/NavBar';
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/hooks/use-toast';

import {
  createRootRouteWithContext,
  Navigate,
  Outlet,
  useLocation,
} from '@tanstack/react-router';

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root,
  notFoundComponent: () => <>404 not found</>,
  pendingComponent: () => <>Loading default... </>,
  errorComponent: ({ error }) => {
    if (error instanceof JwtTokenExpired || JwtTokenInvalid) {
      toast({
        title: 'Unauthorized',
        description: 'Please sign-up or sign-in in order to use the app!',
        variant: 'destructive',
      });
      return Navigate({ to: '/auth' });
    }

    return <div>Failed default: {error.message} </div>;
  },
  wrapInSuspense: true,
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
