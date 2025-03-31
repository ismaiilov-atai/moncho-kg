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
  InputOTPSlot,
} from '@/components/ui/input-otp';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/signup-store';

function VerifyOTP() {
  const { t } = useTranslation();
  const { authPageCount } = useAuthStore((state) => state);
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
    <Card className='w-[85%] h-full ml-auto mr-auto max-sm:border-none max-sm:shadow-none flex flex-col px-4 gap-[10%]'>
      <CardHeader>
        <CardTitle className=' font-playfair font-normal'>
          {t('enter-confirm-code')}
        </CardTitle>
        <CardDescription>
          {t(`${authPageCount}-signup-description`)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className='flex flex-col justify-center gap-20'
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
                <div className=' w-full flex justify-center items-center gap-5 '>
                  {Array(4)
                    .fill(0)
                    .map((_, index) => {
                      return (
                        <InputOTPGroup
                          key={index}
                          className='[&>div]:w-12 [&>div]:h-12'>
                          <InputOTPSlot index={index} />
                        </InputOTPGroup>
                      );
                    })}
                </div>
              </InputOTP>
            )}
          />
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <SubmitButton
                title={t('verify')}
                disabled={!canSubmit}
                loading={isSubmitting || isPending}
              />
            )}
          />
        </form>
      </CardContent>
    </Card>
  );
}

export default VerifyOTP;
