import { useUserStore } from '@/stores/user-store';
import { useTranslation } from 'react-i18next';
import { greeting } from '@/lib/utils';

const GreetingQuote = () => {
  const { name } = useUserStore((state) => state);
  const { t } = useTranslation();
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
