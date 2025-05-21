import { Skeleton } from '@/components/ui/skeleton';
import StatsLoading from '../Stats/StatsLoading';

export function HomePending() {
  return (
    <div className='space-y-6 px-4 pt-4'>
      <div>
        <Skeleton className='h-6 w-full mb-2' />
        <Skeleton className='h-4 w-full' />
      </div>
      <div className='border rounded-xl p-4 space-y-3'>
        <Skeleton className='h-6 w-full' />
        <div className='bg-muted rounded-lg p-3 space-y-2'>
          <Skeleton className='h-5 w-1/2' />
          <Skeleton className='h-4 w-2/3' />
        </div>
        <Skeleton className='h-10 w-40 rounded-md' />
      </div>
      <StatsLoading />
    </div>
  );
}
