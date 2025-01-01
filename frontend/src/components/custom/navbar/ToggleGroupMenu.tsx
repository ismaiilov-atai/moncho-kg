import { ToggleGroup } from '@/components/ui/toggle-group';

interface Props {
  title: string;
  defaultValue: string;
  onValueChange: (val: string) => void;
  children: React.ReactElement[];
}

const ToggleGroupMenu = ({
  title,
  defaultValue,
  onValueChange,
  children,
}: Props) => {
  return (
    <div className='px-1 pb-1 rounded-sm space-y-2'>
      <span className='font-mono text-xs'>{title}</span>
      <ToggleGroup
        type='single'
        className=' flex justify-evenly'
        onValueChange={(e) => onValueChange(e)}
        defaultValue={defaultValue}>
        {children}
      </ToggleGroup>
    </div>
  );
};

export default ToggleGroupMenu;
