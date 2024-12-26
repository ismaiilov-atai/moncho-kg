import { Link, useRouter } from '@tanstack/react-router';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const paths = [{ pathName: '' }];

interface Props {
  showMenu: boolean;
  setShowMenu: (state: boolean) => void;
}

const Menu = ({ showMenu, setShowMenu }: Props) => {
  const { navigate } = useRouter();
  return (
    <Sheet open={showMenu} onOpenChange={() => setShowMenu(!showMenu)}>
      <SheetTrigger></SheetTrigger>
      <SheetContent className=' w-[50%] h-[50%] rounded-bl-md p-1 pl-3 '>
        <SheetHeader className=' text-left flex flex-col left-2 w-full space-y-1'>
          <SheetTitle className=' font-sans pt-1'>Menu</SheetTitle>
          <SheetDescription>{''}</SheetDescription>
          <Separator />
        </SheetHeader>
        <div className='flex flex-col space-y-1'>
          {paths.map(({ pathName }) => (
            <Link
              to={`/${pathName}`}
              className='[&.active]:font-bold'
              key={pathName}>
              {pathName
                ? pathName.slice(0, 1).toUpperCase() +
                  pathName.slice(1, pathName.length)
                : 'Home'}
            </Link>
          ))}
        </div>
        <Button
          variant={'outline'}
          onClick={() => navigate({ to: '/auth', replace: true })}
          className=' absolute w-[50%] ml-[24%] bottom-2  self-center h-6 text-gray-800 rounded-sm '>
          logout
          <LogOut className=' w-2 h-2' />
        </Button>
      </SheetContent>
    </Sheet>
  );
};

export default Menu;
