import { DetectOnScroll } from './DetectOnScrollHOC';
import { useUserStore } from '@/stores/user-store';
import { MenuIcon } from 'lucide-react';
import { greeting } from '@/lib/utils';
import { useState } from 'react';
import Menu from './Menu';

export const NavBar = () => {
  const { name } = useUserStore((state) => state);
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <div className='p-2 flex gap-2 justify-between h-full '>
        {
          <DetectOnScroll>
            <div className=' flex justify-between pl-2 pr-2 h-full items-center'>
              <span className=' font-extrabold tracking-wide text-lg font-mono ease-in'>
                {greeting()} {name}
              </span>
              <MenuIcon
                onClick={() => setMenuOpen(true)}
                className='w-7 h-7 rounded-md bg-gray-50 p-1'
              />
            </div>
          </DetectOnScroll>
        }
        <Menu showMenu={menuOpen} setShowMenu={setMenuOpen} />
      </div>
    </>
  );
};
