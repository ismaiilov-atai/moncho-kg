import { useUserStore } from '@/stores/user-store';
import { useTranslation } from 'react-i18next';
import { toast } from '@/hooks/use-toast';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { cn } from '@/lib/utils';

const LogoutButton = ({ styles }: { styles: string }) => {
  const { t } = useTranslation();
  const { updateFirstName, phoneNumber } = useUserStore((state) => state);

  const onLogoutClick = () => {
    signOut(auth)
      .then(() => {
        toast({ title: t('logout-successful') });
        updateFirstName('');
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
        hidden: !phoneNumber,
      })}
      onClick={onLogoutClick}>
      {t('logout')}
    </span>
  );
};

export default LogoutButton;
