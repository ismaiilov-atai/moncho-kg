import { PopoverTrigger } from '@radix-ui/react-popover';
import { Button } from '@/components/ui/button';
import { QrCode, X } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

const FABTrigger = ({ isQR_Opened }: { isQR_Opened: boolean }) => {
  return (
    <PopoverTrigger asChild>
      <Button
        variant={isQR_Opened ? 'outline' : 'default'}
        className={cn('rounded-full w-12 h-12', {
          'text-xl bg-white  border-gray-200 border-2 ': isQR_Opened,
        })}>
        {isQR_Opened ? (
          <motion.div
            animate={{ rotate: 90 }}
            transition={{
              duration: 0.8,
              bounce: 0.5,
              type: 'spring',
            }}>
            <X className=' text-red-600' />
          </motion.div>
        ) : (
          <QrCode />
        )}
      </Button>
    </PopoverTrigger>
  );
};

export default FABTrigger;
