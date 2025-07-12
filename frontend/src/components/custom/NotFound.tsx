import NotFoundImg from '@/assets/not-found.svg';
import { Link } from '@tanstack/react-router';
import { buttonVariants } from '../ui/button';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <section className=' w-full h-[80svh] place-items-center place-content-center text-center space-y-4'>
      <img src={NotFoundImg} alt='not found image' />
      <section>
        <div className=' text-foreground text-lg font-bold'>
          {t('not-found')}
        </div>
        <div className=' text-xs'>{t('not-found-description')}</div>
      </section>
      <Link
        to='/'
        className={`${buttonVariants({ variant: 'outline' })} w-40 `}>
        {t('Home')}
      </Link>
    </section>
  );
};

export default NotFound;
