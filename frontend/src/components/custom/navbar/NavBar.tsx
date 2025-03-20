import Company from '../Company';
import DesctopMenu from './LargeMenu';
import PopoverMenu from './PopoverMenu';

export const NavBar = () => {
  return (
    <nav className='flex h-[64px] w-full max-md:space-x-8 justify-left center px-4 bg-white shadow-md desktop:w-[85%] desktop:place-self-center desktop:shadow-none desktop:border-b-[1.5px] '>
      <PopoverMenu />
      <Company />
      <DesctopMenu />
    </nav>
  );
};
