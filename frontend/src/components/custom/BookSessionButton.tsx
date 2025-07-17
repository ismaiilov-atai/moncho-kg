import { BOOK_SESSION_SEARCH_DEFAULT_VALUES } from '@/lib/constants';
import { buttonVariants } from '../ui/button';

import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { Link } from '@tanstack/react-router';

const BookSessionButton = () => {
  const { t } = useTranslation();
  return (
    <Link
      to='/book-session'
      preload='intent'
      search={BOOK_SESSION_SEARCH_DEFAULT_VALUES}
      className={cn(buttonVariants({ variant: 'default' }), ' min-w-32 ')}>
      {t('Book a session')}
    </Link>
  );
};

export default BookSessionButton;
