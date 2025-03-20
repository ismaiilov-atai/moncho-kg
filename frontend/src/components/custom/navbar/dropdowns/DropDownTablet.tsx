import { ContentLocal } from './DropDownLocal';
import { ContentTheme } from './DropDownTheme';
import { ChevronDown } from 'lucide-react';
import { t } from 'i18next';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const DropDownTablet = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className=' text-xs space-x-1 rounded-xs px-2 border h-9 flex justify-around items-center'>
        <span>{t('Preferences')}</span>
        <ChevronDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent side='top' align='end'>
        <ContentLocal />
        <DropdownMenuSeparator />
        <ContentTheme />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownTablet;
