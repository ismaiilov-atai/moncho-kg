import Company from '../Company';
import Menu from './Menu';

export const NavBar = () => {
  return (
    <nav className='flex h-[64px] w-full max-md:space-x-8 justify-left items-center pl-2 pr-2 bg-white shadow-md desktop:w-[70%] desktop:place-self-center desktop:shadow-none desktop:border-b-[1.5px]'>
      <Menu />
      <Company />
    </nav>
  );
};
