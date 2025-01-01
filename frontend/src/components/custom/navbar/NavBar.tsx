import { DetectOnScroll } from '../DetectOnScrollHOC';
import { useUserStore } from '@/stores/user-store';
import { useTranslation } from 'react-i18next';
import { cn, greeting } from '@/lib/utils';
import { useState } from 'react';
import Menu from './Menu';

export const NavBar = () => {
  const { name } = useUserStore((state) => state);
  const [scrolled, setScrolled] = useState(false);
  const { t, i18n } = useTranslation();

  return (
    <>
      <div className='p-2 flex gap-2 justify-between h-full '>
        {
          <DetectOnScroll setScrolled={setScrolled}>
            <div className=' flex justify-between items-center pl-2 pr-2 h-full desktop:w-[70%] desktop:place-self-center bg-secondary shadow-md'>
              <span
                className={cn('flex flex-col ease-in ', {
                  'self-start': i18n.language === 'ky',
                })}>
                <span className='font-extrabold tracking-wide text-lg font-mono'>
                  {t(greeting())} {name}
                </span>
                <blockquote
                  className={cn(
                    ' text-[12px] italic font-thin text-pretty text-gray-900 dark:text-white animate-quote-slide-down overflow-clip flex flex-col w-[80%]',
                    {
                      hidden: i18n.language !== 'ky' || scrolled,
                    }
                  )}>
                  <p>"Кыялданууну токтотпогондор гана жеңишке жетет."</p>
                  <cite className=' text-right pe-3 font-medium text-gray-900 dark:text-white'>
                    Наполеон Бонапарт
                  </cite>
                </blockquote>
              </span>

              <Menu />
            </div>
          </DetectOnScroll>
        }
      </div>
    </>
  );
};
