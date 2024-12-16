import { createFileRoute, Outlet } from '@tanstack/react-router';
import { ACCESS_TOKEN } from '@server/types/constants';
import clientApi from '@/lib/clientApi';

export const Route = createFileRoute('/_protected')({
  beforeLoad: async () => {
    try {
      const user = await clientApi.getUser();
      if ('err' in user) throw user.err;
      else sessionStorage.setItem(ACCESS_TOKEN, user.token);
    } catch (error) {
      throw error;
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
