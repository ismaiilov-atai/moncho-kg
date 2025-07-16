import { useLocation, useNavigate } from '@tanstack/react-router';
import { ACCESS_TOKEN } from '@server/types/constants';
import { useUserStore } from '@/stores/user-store';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { toast } from '@/hooks/use-toast';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { cn } from '@/lib/utils';

const LogoutButton = ({ styles }: { styles: string }) => {
  const { t } = useTranslation();
  const { userId, logoutSetDefaultUser } = useUserStore((state) => state);
  const location = useLocation();
  const navigate = useNavigate();

  const onLogoutClick = () => {
    signOut(auth)
      .then(async () => {
        sessionStorage.removeItem(ACCESS_TOKEN);
        logoutSetDefaultUser();
        navigate({ to: location.pathname });
        toast({ title: t('logout-successful') });
      })
      .catch((error) => {
        toast({
          title: t('failed-message'),
          description: (error as Error).message,
          variant: 'destructive',
        });
      });
  };

  return (
    <form className='inline'>
      <Button
        type='submit'
        variant='link'
        className={cn(
          `${styles} cursor-pointer max-md:w-full justify-start no-underline hover:no-underline`,
          {
            hidden: !userId,
          }
        )}
        onClick={onLogoutClick}>
        {t('logout')}
      </Button>
    </form>
  );
};

export default LogoutButton;
