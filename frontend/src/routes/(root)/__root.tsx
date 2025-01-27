import { NavBar } from '@/components/custom/navbar/NavBar';
import { useStripeStore } from '@/stores/stripe-store';
import type { RouterContext } from '@/routerContext';
import StripeClient from '@/components/StripeClient';
import { Toaster } from '@/components/ui/toaster';
import FAB from '@/components/custom/main/FAB';
import { useTranslation } from 'react-i18next';
import moment from 'moment-timezone';
import '@/lib/moment_locals';

import {
  createRootRouteWithContext,
  Outlet,
  useLocation,
} from '@tanstack/react-router';
import RootPending from '@/routes/(root)/RootPending';

export const Route = createRootRouteWithContext<RouterContext>()({
  component: Root,
  notFoundComponent: () => <>404 not found</>,
  pendingComponent: () => <RootPending />,
  errorComponent: ({ error }) => <div>Failed default: {error.message} </div>,
  wrapInSuspense: true,
});

function Root() {
  const location = useLocation();
  const { i18n } = useTranslation();
  moment.locale(i18n.language);
  const { clientSecret } = useStripeStore((state) => state);
  if (clientSecret) return <StripeClient clientSecret={clientSecret} />;

  return (
    <div className='space-y-16 relative flex flex-col items-center'>
      <header>{location.pathname.startsWith('/auth') || <NavBar />}</header>
      <main className='w-full desktop:max-w-[60%]'>
        <Outlet />
        <aside className='fixed bottom-8 left-0 ml-[80%] lg:ml-[90%]'>
          <FAB />
        </aside>
        <Toaster />
      </main>
    </div>
  );
}
