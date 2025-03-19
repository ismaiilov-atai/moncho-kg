import InstantNotify from '@/assets/instant-notify.svg';
import Effortless from '@/assets/effortless.svg';
import { useTranslation } from 'react-i18next';
import Welcome from '@/assets/welcome.svg';
import Group from '@/assets/group.svg';
import { motion } from 'motion/react';

const illustrations = [Welcome, Effortless, Group, InstantNotify];
const boardingPages = ['welcome', 'effortless', 'group', 'update'];

interface PageProps {
  boardingPage: number;
}

const OnboardingContent = ({ boardingPage }: PageProps) => {
  const { t } = useTranslation();
  return (
    <motion.div
      key={`_${boardingPage}`}
      className='h-full w-full flex max-xs:h-dvh items-center flex-col justify-center p-6 gap-16'
      initial={boardingPage !== 0 ? { x: 300, opacity: 0 } : {}}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -500, opacity: 0 }}
      transition={{
        duration: 0.6,
        bounce: 0.35,
        type: 'spring',
      }}>
      <img
        src={illustrations[boardingPage]}
        alt={`${boardingPages[boardingPage]}-illustration`}
        className='max-xs:h-[40%] max-xs:w-[60%] h-[260px] w-[220px]'
      />
      <section className='flex flex-col space-y-4'>
        <p className='text-2xl tracking-wider capitalize'>
          {t(`board-${boardingPages[boardingPage]}-title`)}
        </p>
        <span className='text-pretty text-sm/relaxed text-muted-foreground'>
          {t(`board-${boardingPages[boardingPage]}-description`)}
        </span>
      </section>
    </motion.div>
  );
};

export default OnboardingContent;
