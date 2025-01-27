import { cn } from '@/lib/utils';
import moment from 'moment';

interface Props {
  time: string;
  changingTo?: boolean;
}

export const RescheduleCard = ({ time, changingTo }: Props) => {
  return (
    <section
      className={cn('flex flex-col h-14 bg-secondary rounded-md', {
        'bg-primary/50': changingTo,
      })}>
      <span className=' w-full text-center'>{changingTo ? 'to' : 'from'} </span>
      <span className=' w-full text-center'>
        {moment(time).format('MMM DD HH:mm')}
      </span>
    </section>
  );
};
