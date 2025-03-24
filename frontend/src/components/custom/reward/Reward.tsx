import RewardCirlceContainer from './RewardCirlceContainer';
import { LockKeyhole } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

const Reward = () => {
  const { t } = useTranslation();
  return (
    <Card>
      <CardHeader>
        <CardTitle className=' text-lg font-roboto'>
          {t('reward_title')}
        </CardTitle>
      </CardHeader>
      <CardContent className=' relative '>
        <section className='flex gap-3 '>
          <div className='relative flex h-32 w-32'>
            <RewardCirlceContainer />

            <LockKeyhole className=' absolute left-[40%] top-[45%]' size={32} />
            <section className=' bottom-0 left-[39%] text-center absolute'>
              <span className=' font-bold text-lg'>1</span> / <span>5</span>
            </section>
          </div>

          <section className=' items-end md:items-start w-[46%]'>
            <p className=' text-xl font-roboto font-bold  text-foreground'>
              {t('start_journey')}
            </p>

            <CardDescription>{t('start_jorney_description')}</CardDescription>
          </section>
        </section>
        <section className='h-16 place-content-end text-end invisible md:visible absolute bottom-4 right-5'>
          <Button className=' w-32 '>QR code</Button>
        </section>
      </CardContent>
    </Card>
  );
};

export default Reward;
