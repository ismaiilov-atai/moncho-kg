import { zodValidator } from '@tanstack/zod-form-adapter';
import { OTP_CODE, otpSchema } from '@/types/form-types';
import { ACCESS_TOKEN } from '@server/types/constants';
import { useNavigate } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/auth-store';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { onFormSubmit } from '@/lib/utils';
import { useForm } from '@/hooks/useForm';
import SubmitButton from '../SubmitButton';
import { toast } from '@/hooks/use-toast';
import clientApi from '@/lib/clientApi';
import { api } from '@/lib/api';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';

function VerifyOTP() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: clientApi.verifyOtpCode,
  });
  const { mutateAsync: insertUserMutation } = useMutation({
    mutationFn: api.auth.$post,
  });

  const { name, phoneNumber, lastName } = useAuthStore((state) => state);
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      otpCode: '',
    } as OTP_CODE,
    onSubmit: async ({ otpCode }) => {
      try {
        const resp = await mutateAsync({
          code: otpCode,
          phoneNumber,
        });
        if ('errorCode' in resp) throw resp;
        const insertUserResponse = await insertUserMutation({
          json: {
            name,
            lastName,
            phoneNumber,
          },
        });
        const data = await insertUserResponse.json();
        if (!data.isSuccess) throw insertUserResponse;
        sessionStorage.setItem(ACCESS_TOKEN, data.token);
        navigate({
          to: '/',
        });
        toast({
          title: `Welcome to Moncho-KG, ${name}`,
          description: 'All good, all well',
        });
      } catch (error) {
        throw error;
      }
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
            <SubmitButton
              title='Verify'
              disabled={!canSubmit}
              loading={isSubmitting || isPending}
              className='bg-green-500 hover:bg-green-400'
            />
          )}
        />
      </form>
    </div>
  );
}

export default VerifyOTP;
