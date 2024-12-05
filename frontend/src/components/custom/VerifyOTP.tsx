import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { Button } from '../ui/button';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { onFormSubmit } from '@/lib/utils';
import { OTP_CODE, otpSchema } from '@/types/form-types';
import { useAuthStore } from '@/routes/auth/route';
import clientApi from '@/lib/clientApi';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from '@tanstack/react-router';

function VerifyOTP() {
  const { lastName, name, phoneNumber } = useAuthStore((state) => state);
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      otpCode: '',
    } as OTP_CODE,
    onSubmit: async ({ value }) => {
      const resp = await clientApi.verifyOtpCode(value.otpCode, phoneNumber);
      if ('errorCode' in resp) {
        toast({
          title: 'OOOPS!',
          description: resp.message,
          duration: 2000,
          variant: 'destructive',
        });
        return;
      }
      navigate({
        to: '/',
      });
      toast({
        title: `${name} Access Granted!`,
        description: 'You are set to go.',
        duration: 2000,
      });
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: otpSchema,
    },
  });

  return (
    <div className='flex flex-col'>
      <form
        className='flex flex-col justify-center gap-5'
        onSubmit={(e) => onFormSubmit<OTP_CODE>(e, form)}>
        <form.Field
          name='otpCode'
          children={(field) => (
            <InputOTP
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS}
              value={field.state.value}
              id={field.name}
              name={field.name}
              onBlur={field.handleBlur}
              onChange={(val) => field.handleChange(val)}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
          )}
        />
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button
              type='submit'
              disabled={!canSubmit}
              className=' bg-green-500 hover:bg-green-400'>
              {isSubmitting ? '...' : 'Verify'}
            </Button>
          )}
        />
      </form>
    </div>
  );
}

export default VerifyOTP;
