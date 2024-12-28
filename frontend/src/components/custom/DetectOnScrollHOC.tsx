import { ReactElement, useEffect, useRef, useState } from 'react';

export const DetectOnScroll = ({ children }: { children: ReactElement }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    const onWindScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener('scroll', onWindScroll);
    return () => window.removeEventListener('scroll', onWindScroll);
  }, []);

  const classes = `transition-all easy-out duration-1000 w-full fixed top-0 left-0 bg-white
      ${scrollPosition < 15 ? 'h-20 flex flex-col ' : 'h-10 border-b-[1px] border-gray-300'}`;

  return (
    <div ref={ref} className={classes}>
      {children}
    </div>
  );
};
