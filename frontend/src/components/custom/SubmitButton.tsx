import { LoaderCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

interface Props {
  disabled: boolean;
  title: string;
  loading: boolean;
  className?: string;
}

const SubmitButton = ({ disabled, title, loading, className }: Props) => {
  return (
    <Button type='submit' disabled={disabled} className={cn(className)}>
      {loading ? <LoaderCircle className=' animate-spin' /> : title}
    </Button>
  );
};

export default SubmitButton;
