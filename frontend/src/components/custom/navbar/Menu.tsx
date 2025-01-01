import { ToggleGroupItem } from '@/components/ui/toggle-group';
import { Theme, useTheme } from '@/components/theme-provider';
import { Link, useRouter } from '@tanstack/react-router';
import { locals, paths, themes } from '@/lib/constants';
import { PopoverClose } from '@radix-ui/react-popover';
import { LogOut, MenuIcon, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../ui/button';
import moment from 'moment-timezone';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import ToggleGroupMenu from './ToggleGroupMenu';

const Menu = () => {
  const { navigate } = useRouter();
  const { i18n } = useTranslation();
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
        <MenuIcon className='w-7 h-7 rounded-md bg-primary text-white p-1 ' />
      </PopoverTrigger>
      <PopoverContent
        sideOffset={-40}
        side='bottom'
        align='end'
        className=' rounded-lg h-[450px] w-44 shadow-lg data-[state=open]:data-[side=bottom]:animate-slide-down-and-appear data-[state=closed]:data-[side=bottom]:animate-slide-up-and-disappear'>
        <div className=' flex justify-between pl-2'>
          <span className='font-extrabold text-2xl'>Menu</span>
          <PopoverClose>
            <X className='w-7 h-7 bg-accent p-1 rounded-md' />
          </PopoverClose>
        </div>
        <div className='p-1 space-y-2'>
          <div className='flex flex-col space-y-1 px-1'>
            {paths.map(({ pathName }) => (
              <Link
                to={`/${pathName}`}
                className='[&.active]:font-bold'
                key={pathName}>
                {pathName
                  ? pathName.slice(0, 1).toUpperCase() +
                    pathName.slice(1, pathName.length)
                  : 'Home'}
              </Link>
            ))}
          </div>
          <ToggleGroupMenu
            title='Languages'
            defaultValue={i18n.language}
            onValueChange={(local) => onlanguagechange(local)}>
            {locals.map((lang) => (
              <ToggleGroupItem
                key={lang.key}
                value={lang.key}
                variant={'outline'}
                size={'sm'}
                className='text-xl p-0 border-0 relative rounded-xs w-4 h-6'>
                {lang.flag}
              </ToggleGroupItem>
            ))}
          </ToggleGroupMenu>
          <ToggleGroupMenu
            title='Theme'
            defaultValue={theme}
            onValueChange={(val) => setTheme((val as Theme) || 'system')}>
            {themes.map((theme) => (
              <ToggleGroupItem
                key={theme.name}
                value={theme.name}
                variant={'outline'}
                size={'sm'}
                className=' font-extralight text-xl border-0 relative rounded-xs w-4 h-6'>
                {<theme.icon size={16} />}
              </ToggleGroupItem>
            ))}
          </ToggleGroupMenu>

          <Button
            variant={'outline'}
            onClick={() => navigate({ to: '/auth', replace: true })}
            className=' absolute w-[50%] ml-[24%] bottom-2  self-center h-6 text-gray-800 rounded-sm '>
            logout
            <LogOut className=' w-2 h-2' />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Menu;
