import { DaysType } from '@/types/day';
import { Skeleton } from '../ui/skeleton';
import moment from 'moment-timezone';

interface PageProps {
  isPending?: boolean;
  days: DaysType[];
}

const SevenDaysRangeHeader = ({ isPending, days }: PageProps) => {
  return (
    <div className=' w-full flex justify-center'>
      {isPending ? (
        <Skeleton className=' w-[20%] h-8 self-center' />
      ) : (
        <span className=' text-lg font-semibold font-roboto text-center'>
          {moment(days[0].day).format('MMMM DD')}
          <span> - </span>
          {moment(days[days.length - 1].day).format('MMMM DD, YYYY')}
        </span>
      )}
    </div>
  );
};

export default SevenDaysRangeHeader;
