import { LOCALES } from '@/lib/constants';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const LOCAL_NUMBERING: { [key: string]: number } = {
  ky: 0,
  en: 1,
  ru: 2,
};

export const ContentLocal = () => {
  const { t, i18n } = useTranslation();
  return (
    <section className=' space-y-1'>
      <DropdownMenuLabel>{t('Language')}</DropdownMenuLabel>
      {LOCALES.map(({ name, flag, key }) => (
        <DropdownMenuItem
          onClick={() => i18n.changeLanguage(key)}
          className={cn({
            'bg-accent': key === i18n.language,
          })}>
          <span>{flag}</span>
          <span>{name}</span>
        </DropdownMenuItem>
      ))}
    </section>
  );
};

const DropDownLocal = () => {
  const { i18n } = useTranslation();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className=' border rounded-xs w-32 h-9 flex justify-around items-center'>
        <div className='space-x-2 text-sm'>
          <span>{LOCALES[LOCAL_NUMBERING[i18n.language]].flag}</span>
          <span>{LOCALES[LOCAL_NUMBERING[i18n.language]].name}</span>
        </div>
        <ChevronDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent className=' rounded-xs '>
        <ContentLocal />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownLocal;
