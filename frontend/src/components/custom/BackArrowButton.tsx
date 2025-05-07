import { useLocation, useNavigate } from '@tanstack/react-router';
import { useAuthStore } from '@/stores/signup-store';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const BackArrowButton = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { authPageCount, backwordAuthPageCount } = useAuthStore(
    (state) => state
  );

  const onClickButton = () => {
    if (authPageCount > 0) return backwordAuthPageCount();
    if (location.href.startsWith('/session')) return navigate({ to: '/' });
  };

  const isBackButtonNeeded = (): boolean => {
    if (
      authPageCount > 0 &&
      (location.pathname === '/login' || location.pathname === '/signup')
    ) {
      return true;
    }
    if (location.href.startsWith('/session')) return true;
    return false;
  };

  return (
    <section
      onClick={onClickButton}
      className={cn(
        'text-muted-foreground hover:bg-accent/40 max-sm:bg-muted/20 rounded-sm p-2 visible flex gap-2 items-center w-24',
        { hidden: !isBackButtonNeeded() }
      )}>
      <ArrowLeft size={30} />
      <p>{t('back')}</p>
    </section>
  );
};

export default BackArrowButton;
