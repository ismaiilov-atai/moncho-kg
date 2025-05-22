import { useUserStore } from '@/stores/user-store';
import { useTranslation } from 'react-i18next';
import RewardProgress from './RewardProgress';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const Reward = () => {
  const { t } = useTranslation();
  const { beenTimes } = useUserStore((state) => state);

  return (
    <Card>
      <CardHeader>
        <CardTitle className=' text-lg font-roboto'>
          {t('reward_title')}
        </CardTitle>
      </CardHeader>
      <CardContent className=' relative '>
        <section className='flex gap-3 md:gap-10'>
          <RewardProgress />
          <section className=' items-end md:items-start w-[50%]'>
            <p className=' text-xl font-roboto font-bold  text-foreground max-xxs:text-sm'>
              {beenTimes < 4 ? t('start_journey') : t('congrats')}
            </p>
            <CardDescription>
              {beenTimes < 4
                ? t('start_jorney_description')
                : t('congrats-description')}
            </CardDescription>
          </section>
        </section>
      </CardContent>
    </Card>
  );
};

export default Reward;
