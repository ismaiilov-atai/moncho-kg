import { ToggleGroupItem } from '@/components/ui/toggle-group';
import { Theme, useTheme } from '@/components/theme-provider';
import { Link, useRouter } from '@tanstack/react-router';
import { LOCALES, PATHS, THEMES } from '@/lib/constants';
import { PopoverClose } from '@radix-ui/react-popover';
import { LogOut, MenuIcon, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import moment from 'moment-timezone';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import ToggleGroupMenu from './ToggleGroupMenu';
import { Separator } from '@/components/ui/separator';
import Company from '../Company';

const PopoverMenu = () => {
  const { t, i18n } = useTranslation();
  const { invalidate } = useRouter();
  const { theme, setTheme } = useTheme();

  const onlanguagechange = (lang: string) => {
    moment.locale(lang);
    i18n.changeLanguage(lang);
    invalidate();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <MenuIcon className='w-8 rounded-md text-primary p-1 md:hidden h-full items-center' />
      </PopoverTrigger>
      <PopoverContent
        sideOffset={-65}
        side='bottom'
        align='end'
        className=' rounded-lg rounded-l-none w-max-[320px] shadow-lg data-[state=open]:data-[side=bottom]:animate-slide-down-and-appear data-[state=closed]:data-[side=bottom]:animate-slide-up-and-disappear pb-4'>
        <div className=' flex justify-between p-3 ml-1'>
          <PopoverClose>
            <motion.div
              animate={{
                rotate: 90,
                transition: {
                  delay: 0.14,
                  duration: 0.1,
                },
              }}>
              <X className='w-7 h-7 text-primary p-1 rounded-md' />
            </motion.div>
          </PopoverClose>
          <Company />
        </div>

        <section className='p-1 pt-5 pl-4 space-y-5'>
          <div className='flex flex-col space-y-2 px-1 font-default text-sm w-full'>
            <span className=' font-playfair font-extrabold '>{t('Menu')}</span>
            {PATHS.map(({ displayName, pathName }) => (
              <Link
                to={`${pathName}`}
                className={` p-2 rounded-xs text-left content-start items-start [&.active]:bg-accent hover:bg-accent/50`}
                key={pathName}>
                {t(displayName)}
              </Link>
            ))}
          </div>
          <Separator />
          <section className=' space-y-4'>
            <ToggleGroupMenu
              title={t('Language')}
              defaultValue={i18n.language}
              onValueChange={(local) => onlanguagechange(local)}>
              {LOCALES.map((lang) => (
                <ToggleGroupItem
                  key={lang.key}
                  value={lang.key}
                  variant={'outline'}
                  size={'sm'}
                  className='border-0 relative p-4 rounded-xs w-20 h-6 '>
                  {lang.flag}
                  <span className='text-xs'>{lang.name}</span>
                </ToggleGroupItem>
              ))}
            </ToggleGroupMenu>
            <ToggleGroupMenu
              title={t('Theme')}
              defaultValue={theme}
              onValueChange={(val) => setTheme((val as Theme) || 'system')}>
              {THEMES.map((theme) => (
                <ToggleGroupItem
                  key={theme.name}
                  value={theme.name}
                  variant={'outline'}
                  size={'sm'}
                  className='border-0 relative p-4 rounded-xs w-20 h-6'>
                  {<theme.icon size={16} />}
                  <span>{t(theme.displayName)}</span>
                </ToggleGroupItem>
              ))}
            </ToggleGroupMenu>
          </section>
        </section>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverMenu;
