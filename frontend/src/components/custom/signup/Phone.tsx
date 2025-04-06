import { zodValidator } from '@tanstack/zod-form-adapter';
import { numberSchema, PhoneType } from '@/types/form';
import { useAuthStore } from '@/stores/signup-store';
import { ChevronDown, InfoIcon } from 'lucide-react';
import { useUserStore } from '@/stores/user-store';
import { useTranslation } from 'react-i18next';
import { useMask } from '@react-input/mask';
import SubmitButton from '../SubmitButton';
import { onFormSubmit } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { useForm } from '@/hooks/useForm';
import { sendOTP } from '@/helpers/auth';
import { Input } from '../../ui/input';
import { useEffect } from 'react';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const filterNumber = (phoneNumber: string): string => {
  const filteredNumber = phoneNumber.replaceAll(/[()-]/g, '');
  return filteredNumber;
};

function Phone() {
  const { t } = useTranslation();
  const { updatePhoneNumber } = useUserStore((state) => state);
  const { authPageCount } = useAuthStore((state) => state);

  const inputRef = useMask({
    mask: '+996(___) __-__-__',
    replacement: { _: /\d/ },
  });

  useEffect(() => inputRef.current.focus(), []);

  const form = useForm({
    defaultValues: {
      phoneNumber: '',
    } as PhoneType,
    onSubmit: async (value) => {
      const filteredPhoneNumber = filterNumber(value.phoneNumber);
      updatePhoneNumber(filteredPhoneNumber);
      sendOTP('+12244937064');
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: numberSchema,
    },
  });

  const regionClick = () => {
    toast({
      title: t('area-click-title'),
      description: t('area-click-description'),
      duration: 2000,
    });
  };

  return (
    <Card className='w-[85%] h-full ml-auto mr-auto max-sm:border-none max-sm:shadow-none flex flex-col px-4  gap-[10%]'>
      <CardHeader className='px-0 w-full gap-2'>
        <CardTitle className='font-arbutus font-normal'>
          {t('enter-phone')}
        </CardTitle>
        <CardDescription className=' text-balance'>
          {t(`${authPageCount}-signup-description`)}
        </CardDescription>
      </CardHeader>
      <form
        className=' w-full flex flex-col gap-28'
        onSubmit={(e) => onFormSubmit(e, form)}>
        <div className=' md:w-[70%] w-full self-center'>
          <form.Field
            name='phoneNumber'
            children={(field) => (
              <section className=' space-y-4'>
                <div className='flex focus-within:ring-2 ring-primary focus-within:focus-visible:ring-ring focus-within:ring-offset-2 rounded-sm '>
                  <div
                    onClick={regionClick}
                    className=' flex bg-muted/60 items-center p-2 rounded-tl-sm rounded-bl-sm gap-1 '>
                    🇰🇬
                    <ChevronDown className=' text-muted-foreground' />
                  </div>
                  <Input
                    id={field.name}
                    name={field.name}
                    className='rounded-sm rounded-l-none border-l-0 text-black focus-visible:ring-0 focus-visible:border-none'
                    placeholder='+996 ( _ _ _ ) _ _-_ _-_ _'
                    maxLength={20}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    ref={inputRef}
                  />
                </div>
                <section className=' flex items-center space-x-2 [&>*]:text-muted-foreground'>
                  <InfoIcon size={24} />
                  <em className=' text-[12px] text-pretty'>
                    {t('start-phone-ex')}
                    <b> 77X, 50X, 70X, 55X, 99X</b>
                  </em>
                </section>
              </section>
            )}
          />
        </div>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <>
              <SubmitButton
                className='md:w-[70%] w-full self-center'
                title={t('get-otp')}
                disabled={!canSubmit}
                loading={isSubmitting}
              />
            </>
          )}
        />
      </form>
      <div
        id='g-recaptcha'
        data-sitekey={import.meta.env.VITE_RECAPCHA_KEY}></div>
    </Card>
  );
}

export default Phone;
