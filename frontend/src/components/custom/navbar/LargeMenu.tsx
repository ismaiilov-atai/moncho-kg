import { PATHS } from '@/lib/constants';
import { Link } from '@tanstack/react-router';
import { t } from 'i18next';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import DropDownLocal from './dropdowns/DropDownLocal';
import DropDownTheme from './dropdowns/DropDownTheme';
import DropDownTablet from './dropdowns/DropDownTablet';

const LargeMenu = () => {
  return (
    <section className='flex justify-between w-[90%] h-full ml-8 max-md:hidden md:visible items-center'>
      <section className='space-x-3 w-[65%] md:w-full overflow-hidden'>
        {PATHS.map(({ displayName, pathName }) => (
          <Link
            to={`${pathName}`}
            className={cn(
              `${buttonVariants({ variant: 'link' })}  [&.active]:text-foreground p-0 py-2   text-sm text-muted-foreground hover:text-foreground hover:no-underline items-end`
            )}
            key={pathName}>
            {t(displayName)}
          </Link>
        ))}
      </section>
      <section className='flex space-x-2 h-full w-[38%] max-lg:hidden items-center'>
        <DropDownLocal />
        <DropDownTheme />
      </section>
      <div className='lg:hidden  '>
        <DropDownTablet />
      </div>
    </section>
  );
};

export default LargeMenu;
