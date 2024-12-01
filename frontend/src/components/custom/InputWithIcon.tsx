import { Label } from '@radix-ui/react-label';

import { Input } from '../ui/input';
import { LoaderCircle } from 'lucide-react';
import { FieldApi } from '@tanstack/react-form';

interface InputWithIconProps {
  field: FieldApi<any, any, any, any>;
}

function FieldInfo({ field }: InputWithIconProps) {
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

function InputWithIcon({ field }: InputWithIconProps) {
  return (
    <div>
      <Label htmlFor={field.name}>First Name:</Label>
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
