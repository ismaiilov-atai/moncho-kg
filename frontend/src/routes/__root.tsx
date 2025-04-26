import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import BackArrowButton from '@/components/custom/BackArrowButton';
import { NavBar } from '@/components/custom/navbar/NavBar';
import RootPending from '@/components/custom/RootPending';
import { useDeviceDetect } from '@/hooks/useDeviceDetect';
import { ACCESS_TOKEN } from '@server/types/constants';
import type { RouterContext } from '@/routerContext';
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
  beforeLoad: async ({ context: { queryClient } }) => {
    try {
      const {
        updateUserId,
        userId,
        updateReservations,
        updateFirstName,
        updatePhoneNumber,
        updateLastName,
        updateBeenTimes,
      } = useUserStore.getState();
      if (!userId) {
        const result = await queryClient.ensureQueryData(userQueryOptions);

        if ('err' in result) throw result.err;
        const { reservations, name, lastName, phoneNumber, beenTimes, userId } =
          result.user;

        updateUserId(userId || '');
        updateReservations(reservations || []);
        updateFirstName(name!);
        updateLastName(lastName!);
        updatePhoneNumber(phoneNumber!);
        updateBeenTimes(beenTimes!);
      }
    } catch (error) {
      throw error;
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
      <main
        className={cn('w-full desktop:max-w-[60%] md:mt-9', {
          'p-4': !location.pathname.startsWith('/onboarding'),
        })}>
        <BackArrowButton />
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
