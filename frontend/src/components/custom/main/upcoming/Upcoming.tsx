import { BOOK_SESSION_SEARCH_DEFAULT_VALUES } from '@/lib/constants';
import { buttonVariants } from '@/components/ui/button';
import { useUserStore } from '@/stores/user-store';
import { useTranslation } from 'react-i18next';
import { Link } from '@tanstack/react-router';
import { Card } from '@/components/ui/card';
import UpcomingCard from './UpcomingCard';
import { cn } from '@/lib/utils';

const Upcoming = () => {
  const { reservations } = useUserStore((state) => state);
  const { t } = useTranslation();
  return (
    <Card className='p-5 flex flex-col space-y-3 '>
      <span className='text-lg h-10 font-roboto px-2 block place-content-center font-semibold'>
        {t('upcoming_reso_title')}
      </span>
      <section className='space-y-2'>
        {reservations.length > 0 && <UpcomingCard />}
        {reservations.length <= 0 && (
          <p className='text-muted-foreground font-roboto text-sm h-11 px-2'>
            {t('no_reso_text')}
          </p>
        )}
      </section>
      <section className='h-16 place-content-end text-end'>
        <Link
          to='/book-session'
          preload='intent'
          search={BOOK_SESSION_SEARCH_DEFAULT_VALUES}
          className={cn(buttonVariants({ variant: 'default' }), ' min-w-32 ')}>
          {t('Book a session')}
        </Link>
      </section>
    </Card>
  );
};

export default Upcoming;
