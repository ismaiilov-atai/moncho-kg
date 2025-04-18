import { useAuthStore } from '@/stores/signup-store';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const SigninBackArrow = () => {
  const { t } = useTranslation();
  const { backwordAuthPageCount, authPageCount } = useAuthStore(
    (state) => state
  );
  return (
    <section
      onClick={() => backwordAuthPageCount()}
      className={cn(
        'sm:absolute max-sm:mt-2 max-sm:bg-muted/20 max-sm:ml-2 self-start left-3 lg:left-[10%] top-[8%] flex gap-2 items-center hover:bg-accent/40 p-2 rounded-sm visible text-muted-foreground',
        { ' hidden ': authPageCount === 0 }
      )}>
      <ArrowLeft />
      <p>{t('back')}</p>
    </section>
  );
};

export default SigninBackArrow;
