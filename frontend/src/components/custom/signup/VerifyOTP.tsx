import { zodValidator } from '@tanstack/zod-form-adapter';
import { ACCESS_TOKEN } from '@server/types/constants';
import { useNavigate } from '@tanstack/react-router';
import { useAuthStore } from '@/stores/signup-store';
import { useMutation } from '@tanstack/react-query';
import { useUserStore } from '@/stores/user-store';
import { OTP_CODE, otpSchema } from '@/types/form';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useTranslation } from 'react-i18next';
import { onFormSubmit } from '@/lib/utils';
import SubmitButton from '../SubmitButton';
import { useForm } from '@/hooks/useForm';
import { getAuth } from 'firebase/auth';
import { api } from '@/lib/api';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';

function VerifyOTP() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { authPageCount } = useAuthStore((state) => state);
  const { mutateAsync: insertUserMutation } = useMutation({
    mutationFn: api.auth.$post,
  });
  const {
    mutateAsync: verifyOtpMutation,
    isPending,
    error: otpError,
  } = useMutation({
    mutationFn: (otp_code: string) =>
      window.confirmationResult.confirm(otp_code),
  });

  const { name, phoneNumber, lastName, updateUserId } = useUserStore(
    (state) => state
  );

  const form = useForm({
    defaultValues: {
      otpCode: '',
    } as OTP_CODE,
    onSubmit: async ({ otpCode }) => {
      try {
        await verifyOtpMutation(otpCode);
        sessionStorage.setItem(
          ACCESS_TOKEN,
          (await getAuth().currentUser?.getIdToken()) || ''
        );
        if (!otpError) {
          const insertUserResponse = await insertUserMutation({
            json: {
              userId: getAuth().currentUser?.uid || '',
              name,
              lastName,
              phoneNumber,
            },
          });

          const data = await insertUserResponse.json();
          if (!data.isSuccess) throw insertUserResponse;
          updateUserId(data.userId || '');
          navigate({ to: '/' });
        }
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
                <div className=' w-full flex justify-center items-center max-xs:gap-1 max-lg:gap-3 gap-10 '>
                  {Array(6)
                    .fill(0)
                    .map((_, index) => {
                      return (
                        <InputOTPGroup
                          key={index}
                          className='max-sm:[&>div]:w-9 [&>div]:w-12 max-sm:[&>div]:h-11 [&>div]:h-12'>
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
