import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { NavBar } from '@/components/custom/navbar/NavBar';
import RootPending from '@/components/custom/RootPending';
import { useDeviceDetect } from '@/hooks/useDeviceDetect';
import { ACCESS_TOKEN } from '@server/types/constants';
import { useStripeStore } from '@/stores/stripe-store';
import type { RouterContext } from '@/routerContext';
import StripeClient from '@/components/StripeClient';
import { onAuthStateChanged } from 'firebase/auth';
import FAB from '@/components/custom/main/fab/FAB';
import { Toaster } from '@/components/ui/toaster';
import { useTranslation } from 'react-i18next';
import { auth } from '@/lib/firebase';
import moment from 'moment-timezone';
import { cn } from '@/lib/utils';
import '@/lib/moment_locals';

import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  useLocation,
} from '@tanstack/react-router';

export const Route = createRootRouteWithContext<RouterContext>()({
  head: (ctx) => {
    const { translation } = ctx.match.context;
    return {
      meta: [
        { title: translation ? translation('MonchoKG') : 'MonchoKG' },
        {
          name: 'description',
          content: translation
            ? translation('board-welcome-description')
            : 'Welcome to MonchoKG',
        },
      ],
    };
  },
  component: Root,
  notFoundComponent: () => <>404 not found</>,
  pendingComponent: () => <RootPending />,
  errorComponent: ({ error }) => <div>Failed default: {error.message} </div>,
  wrapInSuspense: true,
});

function Root() {
  const location = useLocation();
  const { i18n } = useTranslation();
  auth.languageCode = i18n.language;
  moment.locale(i18n.language);
  const { clientSecret } = useStripeStore((state) => state);
  if (clientSecret) return <StripeClient clientSecret={clientSecret} />;
  useDeviceDetect();

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const token = await user.getIdToken();
      sessionStorage.setItem(ACCESS_TOKEN, token);
    } else {
      console.log('Signed out!');
      sessionStorage.removeItem(ACCESS_TOKEN);
    }
  });

  const showNavbar = (): boolean => {
    return location.pathname.startsWith('/onboarding');
  };

  return (
    <div className={cn(' relative flex flex-col items-center')}>
      <HeadContent />
      <header className='sticky top-0 w-screen'>
        {showNavbar() || <NavBar />}
      </header>
      <main className='w-full desktop:max-w-[60%] md:mt-9'>
        <Outlet />
        <aside className='fixed bottom-8 left-0 ml-[80%] lg:ml-[90%]'>
          <FAB />
        </aside>
        <Toaster />
      </main>
      <TanStackRouterDevtools />
    </div>
  );
}
