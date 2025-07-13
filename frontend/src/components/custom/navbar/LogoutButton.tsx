import { useLocation, useNavigate } from '@tanstack/react-router';
import { useUserStore } from '@/stores/user-store';
import { useTranslation } from 'react-i18next';
import { toast } from '@/hooks/use-toast';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { cn } from '@/lib/utils';

const LogoutButton = ({ styles }: { styles: string }) => {
  const { t } = useTranslation();
  const { userId, logoutUser } = useUserStore((state) => state);
  const location = useLocation();
  const navigate = useNavigate();

  const onLogoutClick = () => {
    signOut(auth)
      .then(async () => {
        logoutUser();
        navigate({ to: location.pathname, replace: true });
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
    <span
      className={cn(`${styles} cursor-pointer`, {
        hidden: !userId,
      })}
      onClick={onLogoutClick}>
      {t('logout')}
    </span>
  );
};

export default LogoutButton;
