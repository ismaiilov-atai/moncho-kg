import { InfoIcon, Loader2Icon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../ui/button';
import { SlotsType } from '@/types/day';
import { FormEvent } from 'react';
import moment from 'moment';

interface Props {
  onSubmitAction: (e: FormEvent<HTMLFormElement>) => void;
  onCancel: (e: FormEvent<HTMLButtonElement>) => void;
  selectedTimeSlot: SlotsType;
  guest: number;
  guestNumberClick: (action: 'up' | 'down') => void;
  isPending: boolean;
}

const ReservationDialogActions = ({
  onSubmitAction,
  onCancel,
  selectedTimeSlot,
  guest,
  guestNumberClick,
  isPending,
}: Props) => {
  const { t } = useTranslation();

  return (
    <>
      <div className='flex flex-col gap-5 h-full justify-between'>
        <section className=' space-y-3'>
          <div className=' text-foreground font-semibold'>{t('date-time')}</div>
          <div className=' text-muted-foreground text-sm'>
            {moment(selectedTimeSlot.time).format(`dddd DD-MMMM, YYYY`)}
          </div>
          <span className='text-primary text-sm'>
            {moment(selectedTimeSlot.time).format(`HH:mm`)}
          </span>
          <span className='text-primary'> - </span>
          <span className='text-primary text-sm'>
            {moment(selectedTimeSlot.time).add(1, 'hours').format('HH:mm')}
          </span>
        </section>
        <section className=' space-y-3'>
          <div className='text-foreground font-semibold'>
            {t('availability')}
          </div>
          <span className='text-muted-foreground text-sm'>
            {selectedTimeSlot.spaceLeft - (guest > 0 ? guest + 1 : 0)}
            {` ${t('space')}`}
          </span>
        </section>
        <section className='space-y-4'>
          <div>
            <span className='text-foreground font-semibold max-xs:text-[12px] text-xs m-0'>
              {t('how-many-guest')}
            </span>
            <span className=' text-[10px] text-muted-foreground flex items-center gap-2'>
              {t('up-to-9')}
              <InfoIcon size={14} />
            </span>
          </div>
          <div className=' flex gap-2 justify-around items-center w-1/2'>
            <Button
              variant={'outline'}
              className='h-8 w-8 rounded-full border-foreground'
              onClick={() => guestNumberClick('down')}>
              -
            </Button>
            <span className='text-foreground text-sm'>{guest}</span>
            <Button
              variant={'outline'}
              className='h-8 w-8 rounded-full border-foreground'
              onClick={() => guestNumberClick('up')}>
              +
            </Button>
          </div>
        </section>
      </div>
      <form
        onSubmit={(e) => onSubmitAction(e)}
        className='w-full flex justify-end gap-2 items-end'>
        <Button
          variant={'outline'}
          className=' border-gray-300'
          onClick={(e) => onCancel(e)}>
          {t('cancel')}
        </Button>

        <Button
          type='submit'
          className='font-playfair tracking-wide'
          disabled={isPending}>
          {t('proceed-payment')}
          {isPending && (
            <Loader2Icon className='absolute mx-auto animate-spin text-black' />
          )}
        </Button>
      </form>
    </>
  );
};

export default ReservationDialogActions;
