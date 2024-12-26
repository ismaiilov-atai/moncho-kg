import { numberSchema, PhoneType } from '@/types/form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { useUserStore } from '@/stores/user-store';
import { useMutation } from '@tanstack/react-query';
import { useMask } from '@react-input/mask';
import { ChevronDown } from 'lucide-react';
import SubmitButton from '../SubmitButton';
import { onFormSubmit } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { useForm } from '@/hooks/useForm';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { authApi } from '@/lib/api';

const filterNumber = (phoneNumber: string): string => {
  const filteredNumber = phoneNumber.replaceAll(/[()-]/g, '');
  return filteredNumber;
};

function Phone() {
  const { updatePhoneNumber, pageCount, forwardAuthPage } = useUserStore(
    (state) => state
  );

  const inputRef = useMask({
    mask: '+996(___) __-__-__',
    replacement: { _: /\d/ },
  });

  const { mutateAsync } = useMutation({
    mutationFn: authApi.initOtpCode,
  });

  const form = useForm({
    defaultValues: {
      phoneNumber: '',
    } as PhoneType,
    onSubmit: async (value) => {
      const filteredPhoneNumber = filterNumber(value.phoneNumber);
      updatePhoneNumber(filteredPhoneNumber);

      const response = await mutateAsync(filteredPhoneNumber);
      if ('errorCode' in response) throw response;
      else forwardAuthPage(pageCount);
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: numberSchema,
    },
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
            <SubmitButton
              title='Submit'
              disabled={!canSubmit}
              loading={isSubmitting}
            />
          )}
        />
      </form>
    </div>
  );
}

export default Phone;
