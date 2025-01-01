import { ReactElement, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface Props {
  children: ReactElement;
  setScrolled: (isScroll: boolean) => void;
}

export const DetectOnScroll = ({ children, setScrolled }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const onWindScroll = () => setScrollPosition(window.scrollY);
    setScrolled(scrollPosition >= 13);
    window.addEventListener('scroll', onWindScroll);
    return () => window.removeEventListener('scroll', onWindScroll);
  }, [scrollPosition]);

  const classes = cn(
    `transition-all easy-out duration-1000 w-full fixed top-0 left-0 bg-white h-10`,
    {
      'h-20 flex flex-col': scrollPosition < 13,
    }
  );

  return (
    <div ref={ref} className={classes}>
      {children}
    </div>
  );
};
