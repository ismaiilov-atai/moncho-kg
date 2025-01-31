import { Popover, PopoverContent } from '@/components/ui/popover';
import Logo from '../../../../../public/log-burner.svg';
import { useUserStore } from '@/stores/user-store';
import { QRCode } from 'react-qrcode-logo';
import { motion } from 'motion/react';
import FABTrigger from './FABTrigger';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const FAB = () => {
  const { reservations } = useUserStore((state) => state);
  const [isQR_Opened, setIsQR_Opened] = useState(false);

  return (
    <div
      className={cn('invisible right-1', {
        visible:
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
            className='h-[500px] flex flex-col p-4'
            initial={{ height: 0 }}
            animate={{ height: 500 }}
            exit={{ height: -1, opacity: 0.8 }}
            transition={{
              duration: 0.4,
              bounce: 0.35,
              type: 'spring',
            }}>
            <span className=' bg-gray-100 mx-auto -translate-y-16 rounded-xl border-gray-200 shadow-lg overflow-clip'>
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
                  eyeRadius={6}
                  eyeColor={{ outer: 'black', inner: '#a855f7' }}
                  ecLevel='M'
                />
              )}
            </span>
            <span className=' font-extrabold tracking-wide'>DETAILS: </span>
          </motion.div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FAB;
