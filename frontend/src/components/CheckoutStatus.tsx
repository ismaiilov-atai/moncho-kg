import { useStripeStore } from '@/stores/stripe-store';
import { useNavigate } from '@tanstack/react-router';
import SubmitButton from './custom/SubmitButton';
import { useTranslation } from 'react-i18next';
import { CircleCheckBig } from 'lucide-react';
import { memo } from 'react';

const CheckoutStatus = memo(() => {
  const navigate = useNavigate();
  const { updateStripeStatus, updateClientSecret } = useStripeStore(
    (state) => state
  );
  const { t } = useTranslation();
  const confirmClick = async () => {
    navigate({ to: '/' });
    updateStripeStatus('');
    updateClientSecret('');
  };

  return (
    <div className='w-full flex flex-col items-center gap-6 text-center justify-around'>
      <section className=' text-center flex flex-col justify-center items-center gap-10 '>
        <CircleCheckBig className=' w-16 h-16 text-green-500' />
        <div>
          <div className=' font-bold'>{t('reso-success')}</div>
          <span className='text-sm font-playfair text-muted-foreground '>
            {t('reso-success-description')}
          </span>
        </div>
      </section>
      <form onSubmit={confirmClick} className=' w-full text-center'>
        <SubmitButton
          title={t('gotit')}
          disabled={false}
          loading={false}
          className='w-[80%]'
        />
      </form>
    </div>
  );
});

export default CheckoutStatus;
