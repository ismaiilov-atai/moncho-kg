import { Outlet } from '@tanstack/react-router';
import { NavBar } from '../../components/custom/navbar/NavBar';

const RootPending = () => {
  return (
    <div className=' space-y-16'>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default RootPending;
