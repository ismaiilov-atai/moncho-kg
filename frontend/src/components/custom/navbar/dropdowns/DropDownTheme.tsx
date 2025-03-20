import { Theme, useTheme } from '@/components/theme-provider';
import { ChevronDown } from 'lucide-react';
import { THEMES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { t } from 'i18next';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const THEME_NUMBERING: { [key: string]: number } = {
  system: 0,
  light: 1,
  dark: 2,
};

export const ContentTheme = () => {
  const { theme, setTheme } = useTheme();
  return (
    <section className=' space-y-1'>
      <DropdownMenuLabel>{t('Theme')}</DropdownMenuLabel>
      {THEMES.map(({ displayName, icon, name }) => {
        const Icon = icon;
        return (
          <DropdownMenuItem
            onClick={() => setTheme(name as Theme)}
            className={cn({
              'bg-accent': theme === name,
            })}>
            <Icon size={16} />
            {t(`${displayName}`)}
          </DropdownMenuItem>
        );
      })}
    </section>
  );
};

const DropDownTheme = () => {
  const { theme } = useTheme();
  const ThemeIcon = THEMES[THEME_NUMBERING[theme]].icon;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className=' border rounded-xs w-32 h-9 flex justify-around items-center'>
        <div className='space-x-1 text-sm flex justify-center items-center'>
          <ThemeIcon size={16} />
          <span>{t(THEMES[THEME_NUMBERING[theme]].displayName)}</span>
        </div>
        <ChevronDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent className=' rounded-xs '>
        <ContentTheme />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownTheme;
