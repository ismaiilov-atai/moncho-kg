import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import BackArrowButton from '@/components/custom/BackArrowButton';
import { NavBar } from '@/components/custom/navbar/NavBar';
import RootPending from '@/components/custom/RootPending';
import { useDeviceDetect } from '@/hooks/useDeviceDetect';
import { ACCESS_TOKEN } from '@server/types/constants';
import WentWrong from '@/components/custom/WentWrong';
import type { RouterContext } from '@/routerContext';
import NotFound from '@/components/custom/NotFound';
import { onAuthStateChanged } from 'firebase/auth';
import FAB from '@/components/custom/main/fab/FAB';
import { useUserStore } from '@/stores/user-store';
import { Toaster } from '@/components/ui/toaster';
import { useTranslation } from 'react-i18next';
import { userQueryOptions } from '@/lib/api';
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
import { useEffect } from 'react';

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
  notFoundComponent: () => <NotFound />,
  pendingComponent: () => <RootPending />,
  errorComponent: () => <WentWrong />,
  beforeLoad: async ({ context: { queryClient } }) => {
    const {
      updateUserId,
      userId,
      updateReservations,
      updateFirstName,
      updatePhoneNumber,
      updateLastName,
      updateBeenTimes,
      logoutSetDefaultUser,
    } = useUserStore.getState();
    try {
      if (!userId) {
        const result = await queryClient.ensureQueryData(userQueryOptions);
        if ('err' in result || !result.success) throw result;
        updateUserId(result?.user?.userId || '');
        updateReservations(result?.user?.reservations || []);
        updateFirstName(result?.user?.name || '');
        updateLastName(result?.user?.lastName || '');
        updatePhoneNumber(result?.user?.phoneNumber || '');
        updateBeenTimes(result?.user?.beenTimes || 0);
      }
    } catch (error) {
      logoutSetDefaultUser();
    }
  },
  wrapInSuspense: true,
});

function Root() {
  const location = useLocation();
  const { i18n } = useTranslation();
  auth.languageCode = i18n.language;
  moment.locale(i18n.language);
  useDeviceDetect();
  const logoutSetDefaultUser = useUserStore(
    (state) => state.logoutSetDefaultUser
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && auth.currentUser) {
        const token = await user.getIdToken();
        sessionStorage.setItem(ACCESS_TOKEN, token);
      } else {
        console.log('Signed out!');
        logoutSetDefaultUser();
        sessionStorage.removeItem(ACCESS_TOKEN);
      }
    });
    return unsubscribe();
  }, [auth]);

  // onAuthStateChanged(auth, async (user) => {});

  const isBackButtonNeeded = (): boolean => {
    if (location.pathname === '/login' || location.pathname === '/signup') {
      return true;
    }
    if (location.href.startsWith('/session')) return true;
    return false;
  };

  const showNavbar = (): boolean => {
    return location.pathname.startsWith('/onboarding');
  };

  return (
    <div className={cn(' relative flex flex-col items-center ')}>
      <HeadContent />
      <header className='sticky top-0 w-screen'>
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
      <TanStackRouterDevtools />
    </div>
  );
}
