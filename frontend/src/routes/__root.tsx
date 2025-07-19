import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import BackArrowButton from '@/components/custom/BackArrowButton';
import { NavBar } from '@/components/custom/navbar/NavBar';
import RootPending from '@/components/custom/RootPending';
import { useDeviceDetect } from '@/hooks/useDeviceDetect';
import { ACCESS_TOKEN } from '@server/types/constants';
import { BeforeLoad, cn, MetaHead } from '@/lib/utils';
import WentWrong from '@/components/custom/WentWrong';
import type { RouterContext } from '@/routerContext';
import NotFound from '@/components/custom/NotFound';
import { onAuthStateChanged } from 'firebase/auth';
import FAB from '@/components/custom/main/fab/FAB';
import { Toaster } from '@/components/ui/toaster';
import Footer from '@/components/custom/Footer';
import { useTranslation } from 'react-i18next';
import { auth } from '@/lib/firebase';
import moment from 'moment-timezone';
import { useEffect } from 'react';
import '@/lib/moment_locals';

import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  useLocation,
} from '@tanstack/react-router';

export const Route = createRootRouteWithContext<RouterContext>()({
  head: MetaHead,
  beforeLoad: BeforeLoad,
  component: Root,
  wrapInSuspense: true,
  notFoundComponent: () => <NotFound />,
  pendingComponent: () => <RootPending />,
  errorComponent: () => <WentWrong />,
});

function Root() {
  const location = useLocation();
  const { i18n } = useTranslation();
  auth.languageCode = i18n.language;
  moment.locale(i18n.language);
  useDeviceDetect();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && auth.currentUser) {
        const token = await user.getIdToken();
        sessionStorage.setItem(ACCESS_TOKEN, token);
      } else {
        console.log('Signed out!');
        sessionStorage.removeItem(ACCESS_TOKEN);
      }
    });
    return unsubscribe();
  }, [auth]);

  const isBackButtonNeeded = (): boolean => {
    if (location.pathname === '/login' || location.pathname === '/signup') {
      return true;
    }
    if (location.href.startsWith('/session')) {
      return true;
    }
    return false;
  };

  const showNavbar = (): boolean => {
    return location.pathname.startsWith('/onboarding');
  };

  return (
    <div className={cn(' relative flex flex-col items-center ')}>
      <HeadContent />
      <header className='sticky top-0 w-screen z-50'>
        {showNavbar() || <NavBar />}
      </header>
      <main
        className={cn('w-full h-full desktop:max-w-[60%] mt-2', {
          'p-4': !location.pathname.startsWith('/onboarding'),
          'md:mt-9': isBackButtonNeeded(),
        })}>
        <BackArrowButton />
        <Outlet />
        {location.pathname === '/' && (
          <aside className='fixed bottom-8 left-0 ml-[80%] lg:ml-[90%]'>
            <FAB />
          </aside>
        )}
        <Toaster />
      </main>
      <Footer />
      <TanStackRouterDevtools />
    </div>
  );
}
