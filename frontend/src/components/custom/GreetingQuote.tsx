import { useUserStore } from '@/stores/user-store';
import { QuoteResponseType } from '@/types/quote';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { cn, greeting } from '@/lib/utils';
import { api } from '@/lib/api';

const GreetingQuote = () => {
  const { name } = useUserStore((state) => state);
  const { t } = useTranslation();
  const { data, isPending, isError } = useSuspenseQuery<QuoteResponseType>({
    queryKey: ['quote'],
    queryFn: async () => {
      const response = await api['quote'][':lang'].$get({
        param: { lang: localStorage.getItem('i18nextLng') || 'en' },
      });
      return await response.json();
    },
  });

  if (isPending) <></>;

  return (
    <section
      className={cn('space-y-[12px] flex flex-col', {
        hidden: isError,
      })}>
      <span className=' h-7 text-xl font-arbutus overflow-clip self-end'>
        {t(greeting()) + ` ${name ? name : ''}`}
      </span>
      <section className='w-full flex flex-col space-y-2'>
        <blockquote className='animate-typewriter font-playfair text-muted-foreground text-sm text-end text-balance'>
          {data?.quote}
        </blockquote>
        <span className=' text-end text-xs'>- {data?.author}</span>
      </section>
    </section>
  );
};

export default GreetingQuote;
