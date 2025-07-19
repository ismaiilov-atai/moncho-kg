import { useUserStore } from '@/stores/user-store';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { quoteQueryOptions } from '@/lib/api';
import { cn, greeting } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';

const GreetingQuote = () => {
  const { name } = useUserStore((state) => state);
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const { data, isPending, isError } = useQuery(quoteQueryOptions);
  if (isError) return <></>;

  return (
    <section className={'space-y-[12px] flex flex-col'}>
      <span className=' h-7 text-xl font-arbutus overflow-clip self-end'>
        {t(greeting()) + ` ${name ? name : ''}`}
      </span>
      <section
        className={cn('w-full flex flex-col space-y-2', {
          hidden: isError,
        })}>
        {isPending || !data ? (
          <Skeleton className='w-[40%] h-4 self-end' />
        ) : (
          <>
            <blockquote className='animate-typewriter font-playfair text-muted-foreground text-sm text-end text-balance'>
              {currentLanguage in data.quote
                ? data?.quote[currentLanguage as keyof typeof data.quote]
                : data.quote.en}
            </blockquote>
            <span className=' text-end text-xs'>- {data?.author}</span>
          </>
        )}
      </section>
    </section>
  );
};

export default GreetingQuote;
