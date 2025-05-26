import ReservationDetails from '../../resorvations/ReservationDetails';
import { Popover, PopoverContent } from '@/components/ui/popover';
import { useUserStore } from '@/stores/user-store';
import Logo from '../../../../../public/logo.svg';
import { useTranslation } from 'react-i18next';
import { QRCode } from 'react-qrcode-logo';
import { motion } from 'motion/react';
import FABTrigger from './FABTrigger';
import { Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const FAB = () => {
  const { reservations } = useUserStore((state) => state);
  const [isQR_Opened, setIsQR_Opened] = useState(false);
  const { t } = useTranslation();
  return (
    <div
      className={cn('hidden right-1', {
        'visible block':
          reservations.length > 0 && !location.pathname.startsWith('/auth'),
      })}>
      <Popover
        onOpenChange={(open) => setIsQR_Opened(open)}
        defaultOpen={isQR_Opened}>
        <FABTrigger isQR_Opened={isQR_Opened} />
        <PopoverContent
          sideOffset={10}
          align='end'
          side='top'
          className='rounded-lg'>
          <motion.div
            className='min-h-[550px] flex flex-col p-4 space-y-5 '
            initial={{ height: 0 }}
            animate={{ height: 500 }}
            exit={{ height: -1, opacity: 0.8 }}
            transition={{
              duration: 0.4,
              bounce: 0.35,
              type: 'spring',
            }}>
            <span className='py-4 -translate-y-10 shadow-lg border-2 bg-white border-gray-100  mx-auto rounded-xl overflow-clip w-full flex flex-col items-center'>
              {reservations.length && (
                <QRCode
                  value={String(reservations[0].bookingId)}
                  size={200}
                  quietZone={22}
                  qrStyle='dots'
                  logoImage={Logo}
                  logoHeight={180}
                  logoWidth={180}
                  logoOpacity={0.3}
                  ecLevel='M'
                />
              )}
              <span className=' absolute text-[12px] bottom-[1px] font-playfair text-pretty text-muted-foreground text-left'>
                {t('scan-qr')}
              </span>
            </span>
            <ReservationDetails booking={reservations[0]} />
            <div>
              <span className='text-foreground font-semibold text-xs m-0'>
                {t('how-many-guest')}
              </span>
              <span className=' flex items-center gap-2 text-primary'>
                <Users size={16} />
                {reservations.length > 0 && reservations[0].withYou} 
              </span>
            </div>
          </motion.div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FAB;
