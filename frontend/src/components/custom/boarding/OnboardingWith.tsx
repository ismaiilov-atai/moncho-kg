import { useTranslation } from 'react-i18next';

import Welcome from '@/assets/welcome.svg';
import Effortless from '@/assets/effortless.svg';
import Group from '@/assets/group.svg';
import InstantNotify from '@/assets/instant-notify.svg';

interface PageProps {
  page: number;
}
const illustrations = [Welcome, Effortless, Group, InstantNotify];
const boardingPages = ['welcome', 'effortless', 'group', 'update'];

const OnboardingWith = ({ page }: PageProps) => {
  const { t } = useTranslation();
  return (
    <div className=' flex flex-col h-full justify-center gap-16 '>
      <img
        src={illustrations[page]}
        alt={`${boardingPages[page]}-illustration`}
        className='w-full h-[40%]'
      />
      <div className='flex flex-col space-y-4'>
        <p className='text-2xl tracking-wider capitalize'>
          {t(`board-${boardingPages[page]}-title`)}
        </p>
        <text className='text-pretty text-sm/relaxed text-muted-foreground'>
          {t(`board-${boardingPages[page]}-description`)}
        </text>
      </div>
    </div>
  );
};

export default OnboardingWith;
