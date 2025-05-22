import { useEffect, useRef, useState } from 'react';
import { useUserStore } from '@/stores/user-store';
import { LockKeyhole, UnlockKeyhole } from 'lucide-react';

const RewardProgress = () => {
  const circleRef = useRef<SVGCircleElement | null>(null);
  const { beenTimes } = useUserStore((state) => state);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (circleRef.current) {
      observer.observe(circleRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const strokeDasharray = 100;
  const strokeDashoffset = isVisible
    ? strokeDasharray - 25 * beenTimes
    : strokeDasharray;

  return (
    <div className='relative w-32 h-32 md:w-48 md:h-48'>
      <svg
        className='w-full h-full rotate-[-90deg] ease-linear'
        viewBox='0 0 36 36'>
        <circle
          cx='18'
          cy='18'
          r='16'
          fill='none'
          stroke='#f0eeee'
          strokeWidth='2'
        />
        <circle
          ref={circleRef}
          cx='18'
          cy='18'
          r='16'
          fill='none'
          stroke='#b25f27'
          strokeWidth='2'
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap='round'
          className={`transition-all duration-1000 ease-in-out delay-150`}
        />
      </svg>

      <div className='absolute inset-0 flex flex-col gap-2 items-center justify-center'>
        {beenTimes < 4 ? (
          <LockKeyhole className=' left-[40%] top-[45%]' size={32} />
        ) : (
          <UnlockKeyhole className='left-[40%] top-[45%]' size={32} />
        )}
        <span className='text-sm font-medium text-black'>{beenTimes} / 4</span>
      </div>
    </div>
  );
};

export default RewardProgress;
