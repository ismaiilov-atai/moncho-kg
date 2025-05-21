import { Skeleton } from '@/components/ui/skeleton';

const StatsLoading = () => {
  return (
    <div className='border rounded-xl p-4 space-y-3'>
      <Skeleton className='h-6 w-full' />
      <Skeleton className='h-4 w-full' />
      <div className='flex items-end justify-between pt-2 w-full'>
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} className='min-h-[100px] w-4 rounded-sm' />
        ))}
      </div>
    </div>
  );
};

export default StatsLoading;
