import { SaveOff } from 'lucide-react';

const NoData = () => {
  return (
    <div className=' h-dvh flex flex-col gap-2 items-center justify-center'>
      <SaveOff className=' h-10 w-10' />
      No data available
    </div>
  );
};

export default NoData;
