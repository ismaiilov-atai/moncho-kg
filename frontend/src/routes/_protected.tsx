import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { ACCESS_TOKEN } from '@server/types/constants';
import { toast } from '@/hooks/use-toast';
import clientApi from '@/lib/clientApi';

export const Route = createFileRoute('/_protected')({
  beforeLoad: async () => {
    const user = await clientApi.getUser();
    if ('message' in user) {
      toast({
        title: 'Unauthorized',
        description: 'Please sign-up or sign-in in order to use the app!',
        variant: 'destructive',
      });
      throw redirect({
        to: '/auth',
      });
    } else {
      sessionStorage.setItem(ACCESS_TOKEN, user.token);
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
