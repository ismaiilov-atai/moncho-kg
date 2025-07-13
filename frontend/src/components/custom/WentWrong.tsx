import WentWrongImg from '@/assets/smth-went-wrong.svg';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useRouter } from '@tanstack/react-router';
import { Button, buttonVariants } from '../ui/button';

const WentWrong = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const navigate = useNavigate();
  const location = router.state.location;

  const refreshPage = () => {
    navigate({ to: location.pathname, replace: true });
  };

  return (
    <section className=' w-full h-[80svh] place-items-center place-content-center text-center space-y-8'>
      <img src={WentWrongImg} alt='somthing went wrong image' />
      <section>
        <div className=' text-foreground text-2xl font-bold'>
          {t('smth-went-wrong')}
        </div>
        <div className=' text-xs'>{t('smth-went-wrong-description')}</div>
      </section>
      <section className=' space-x-3'>
        <Link
          to='/'
          className={`${buttonVariants({ variant: 'outline' })} w-40 `}>
          {t('Home')}
        </Link>
        <Button variant='outline' onClick={refreshPage}>
          {t('refresh-page')}
        </Button>
      </section>
    </section>
  );
};

export default WentWrong;
