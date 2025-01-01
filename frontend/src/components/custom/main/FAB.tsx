import { useUserStore } from '@/stores/user-store';
import { Button } from '@/components/ui/button';
import QR from '@/assets/Micro_QR_code.png';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { X } from 'lucide-react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const FAB = () => {
  const { reservations } = useUserStore((state) => state);
  const [openQR, setOpenQR] = useState(false);

  return (
    <div
      className={cn('invisible right-1', {
        visible: reservations.length > 0,
      })}>
      <Popover onOpenChange={(open) => setOpenQR(open)} defaultOpen={openQR}>
        <PopoverTrigger asChild>
          {openQR ? (
            <Button
              variant={'secondary'}
              className='rounded-full text-xl bg-white  border-gray-200 border-2 '>
              <X />
            </Button>
          ) : (
            <Button className='rounded-full'>QR</Button>
          )}
        </PopoverTrigger>
        <PopoverContent
          sideOffset={10}
          align='end'
          side='top'
          className='data-[state=open]:data-[side=top]:animate-slide-up-and-show data-[state=closed]:data-[side=top]:animate-slide-down-and-hide rounded-lg rounded-br-none '>
          <div className=' h-[500px] flex flex-col items-center '>
            <img
              src={QR}
              alt='qr code'
              className='h-[150px] w-4/5 bg-gray-100 -translate-y-16 rounded-xl border-gray-200 border-2 object-contain'
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FAB;
