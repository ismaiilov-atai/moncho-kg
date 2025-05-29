import { Outlet } from '@tanstack/react-router';
import { NavBar } from './navbar/NavBar';

const RootPending = () => {
  return (
    <div className=' space-y-16 mx-auto'>
      <NavBar />
      <div className=' md:max-w-[70%] mx-auto'>
        <Outlet />
      </div>
    </div>
  );
};

export default RootPending;
