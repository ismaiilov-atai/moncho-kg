import type { RouterContext } from '@/routerContext';
import { NavBar } from '@/components/custom/NavBar';
import { Toaster } from '@/components/ui/toaster';

import {
  createRootRouteWithContext,
  Outlet,
  useLocation,
} from '@tanstack/react-router';

export const Route = createRootRouteWithContext<RouterContext>()({
  component: Root,
  notFoundComponent: () => <>404 not found</>,
  pendingComponent: () => <>Loading default... </>,
  errorComponent: ({ error }) => <div>Failed default: {error.message} </div>,
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
