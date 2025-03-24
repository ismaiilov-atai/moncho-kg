import { useUserStore } from '@/stores/user-store';
import { greeting } from '@/lib/utils';
import { t } from 'i18next';

const GreetingQuote = () => {
  const { name } = useUserStore((state) => state);

  return (
    <section className=' space-y-[8px] '>
      <span className=' h-7 text-xl font-arbutus'>
        {t(greeting()) + ` ${name ? name : ''}`}
      </span>
      <blockquote className=' text-muted-foreground text-xs'>
        Take time to deliberate, but when the time for action comes, stop
        thinking and go in. - Napoleon Bonaparte
      </blockquote>
    </section>
  );
};

export default GreetingQuote;
