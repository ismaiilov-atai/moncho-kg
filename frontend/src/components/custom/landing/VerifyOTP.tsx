import { zodValidator } from '@tanstack/zod-form-adapter';
import { ACCESS_TOKEN } from '@server/types/constants';
import { useMutation } from '@tanstack/react-query';
import { useUserStore } from '@/stores/user-store';
import { OTP_CODE, otpSchema } from '@/types/form';
import { useNavHome } from '@/hooks/useNavHome';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { onFormSubmit } from '@/lib/utils';
import SubmitButton from '../SubmitButton';
import { useForm } from '@/hooks/useForm';
import { api, authApi } from '@/lib/api';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';

function VerifyOTP() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: authApi.verifyOtpCode,
  });
  const { mutateAsync: insertUserMutation } = useMutation({
    mutationFn: api.auth.$post,
  });

  const { name, phoneNumber, lastName, updateUserId } = useUserStore(
    (state) => state
  );
  const navigateHome = useNavHome();

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
        sessionStorage.setItem(ACCESS_TOKEN, data.accessToken);

        updateUserId(data.userId || '');
        navigateHome();
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
