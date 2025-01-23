import { FieldApi } from '@tanstack/react-form';
import { Label } from '@radix-ui/react-label';
import { LoaderCircle } from 'lucide-react';
import { Input } from '../ui/input';

interface InputWithIconProps {
  field: FieldApi<any, any, any, any>;
  lableText?: string;
}

export function FieldInfo({ field }: InputWithIconProps) {
  return (
    <div className='h-2 p-1'>
      <em className={`text-red-600 font-thin text-[10px]`}>
        {field.state.meta.isTouched && field.state.meta.errors.length
          ? field.state.meta.errors.join(',')
          : ''}
      </em>
    </div>
  );
}

function InputWithIcon({ field, lableText }: InputWithIconProps) {
  return (
    <div>
      <Label htmlFor={field.name}>{lableText}</Label>
      <div className='relative'>
        <Input
          id={field.name}
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
        />
        {field.state.meta.isValidating ? (
          <LoaderCircle className='absolute top-3 right-2 animate-spin' />
        ) : (
          ' '
        )}
      </div>
      <FieldInfo field={field} />
    </div>
  );
}

export default InputWithIcon;
