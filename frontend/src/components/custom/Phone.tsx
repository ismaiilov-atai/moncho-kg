import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ChevronDown } from 'lucide-react';
import { useMask } from '@react-input/mask';
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { toast } from '@/hooks/use-toast';
import { onFormSubmit } from '@/lib/utils';
import { numberSchema, PhoneType } from '@/types/form-types';
import { AuthPageProps } from '@/types/shared-types';

function Phone({ page, setPage }: AuthPageProps) {
  const form = useForm({
    defaultValues: {
      phoneNumber: '',
    } as PhoneType,
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value);
      setPage(page + 1);
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: numberSchema,
    },
  });

  const inputRef = useMask({
    mask: '+996(___) __-__-__',
    replacement: { _: /\d/ },
  });

  const regionClick = () => {
    toast({
      title: 'Coming soon!',
      description: 'For now we support only locales with +996 code',
      duration: 2000,
    });
  };

  return (
    <div className='  w-full h-full flex flex-col justify-center relative p-8 '>
      <h1 className=' absolute top-12 text-3xl tracking-wider font-extrabold'>
        Phone number
      </h1>
      <form
        className='flex flex-col gap-4'
        onSubmit={(e) => onFormSubmit(e, form)}>
        <div>
          <form.Field
            name='phoneNumber'
            children={(field) => (
              <div className='flex'>
                <Button
                  type='button'
                  variant={'secondary'}
                  className=' rounded-r-none'
                  onClick={regionClick}>
                  🇰🇬
                  <ChevronDown />
                </Button>

                <Input
                  id={field.name}
                  name={field.name}
                  className=' rounded-l-none text-black '
                  placeholder='+996(_ _ _) _ _-_ _-_ _'
                  maxLength={20}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  ref={inputRef}
                />
              </div>
            )}
          />
        </div>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button type='submit' disabled={!canSubmit}>
              {isSubmitting ? '...' : 'Submit'}
            </Button>
          )}
        />
      </form>
    </div>
  );
}

export default Phone;
