import { NavBar } from '@/components/custom/navbar/NavBar';
import type { RouterContext } from '@/routerContext';
import { Toaster } from '@/components/ui/toaster';
import { useTranslation } from 'react-i18next';
import '@/lib/moment_locals';
import moment from 'moment';
import {
  createRootRouteWithContext,
  Outlet,
  useLocation,
  useRouter,
} from '@tanstack/react-router';

export const Route = createRootRouteWithContext<RouterContext>()({
  component: Root,
  notFoundComponent: () => <>404 not found</>,
  pendingComponent: () => {
    <div className=' space-y-16'>
      <NavBar />
      <Outlet />
    </div>;
  },
  errorComponent: ({ error }) => <div>Failed default: {error.message} </div>,
  wrapInSuspense: true,
});

function Root() {
  const { invalidate } = useRouter();
  const { i18n } = useTranslation();
  const location = useLocation();
  if (i18n.language === 'ru' || 'ky') {
    moment.locale(i18n.language);
    invalidate();
  }
  return (
    <div className=' space-y-16'>
      {location.pathname.startsWith('/auth') || <NavBar />}
      <Outlet />
      <Toaster />
    </div>
  );
}
