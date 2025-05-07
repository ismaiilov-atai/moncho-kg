import { zodValidator } from '@tanstack/zod-form-adapter';
import { useAuthStore } from '@/stores/signup-store';
import { User, userInfoSchema } from '@/types/form';
import { useUserStore } from '@/stores/user-store';
import { useTranslation } from 'react-i18next';
import { ValidatorsType } from '@/types/auth';
import InputWithIcon from '../InputWithIcon';
import { onFormSubmit } from '@/lib/utils';
import SubmitButton from '../SubmitButton';
import { useForm } from '@/hooks/useForm';
import { z } from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../ui/card';

const resolveSleeper = async (value: string): Promise<boolean> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return !value.includes('error');
};

function Details() {
  const { t } = useTranslation();
  const { authPageCount, forwardAuthPageCount } = useAuthStore(
    (state) => state
  );
  const { updateFirstName, updateLastName, name, lastName } = useUserStore(
    (state) => state
  );
  const form = useForm({
    defaultValues: {
      name: name || '',
      lastName: lastName || '',
    } as User,
    onSubmit: async (value) => {
      updateFirstName(value.name);
      updateLastName(value.lastName);
      forwardAuthPageCount();
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: userInfoSchema,
    },
  });

  const createValidators = (fieldName: string): ValidatorsType => {
    return {
      onChange:
        fieldName === 'name'
          ? userInfoSchema.shape.name
          : userInfoSchema.shape.lastName,
      onChangeAsyncDebounceMs: 500,
      onChangeAsync: z.string().refine(resolveSleeper, {
        message: `Please provide valid input.`,
      }),
    };
  };

  const separateDescription = (description: string): React.ReactNode => {
    const descrArray = description.split(' ');
    for (let i = 0; i < descrArray.length; i++) {
      if (descrArray[i].endsWith('!')) {
        const firestWelcome = descrArray.splice(0, i + 1);
        return (
          <section className=' flex flex-col gap-4 '>
            <p>{firestWelcome.join(' ')}</p>
            <p>{descrArray.join(' ')}</p>
          </section>
        );
      }
    }
    return <div>{description}</div>;
  };

  return (
    <Card className='h-full w-full max-sm:border-none max-sm:rounded-none max-sm:shadow-none'>
      <CardHeader>
        <CardTitle className=' font-arbutus font-normal'>
          {t(`Signup`)}
        </CardTitle>
        <CardDescription className='text-balance'>
          {separateDescription(t(`${authPageCount}-signup-description`))}
        </CardDescription>
      </CardHeader>
      <CardContent className='place-self-center h-2/3 w-full '>
        <form
          className='flex flex-col justify-between h-full'
          onSubmit={(e) => onFormSubmit(e, form)}>
          <div className='flex flex-col space-y-10 mt-auto mb-auto'>
            <form.Field
              name='name'
              validators={createValidators('name')}
              children={(field) => (
                <InputWithIcon field={field} lableText={t('name')} />
              )}
            />
            <form.Field
              name='lastName'
              validators={createValidators('lastName')}
              children={(field) => (
                <InputWithIcon field={field} lableText={t('last-name')} />
              )}
            />
          </div>
          <form.Subscribe
            selector={(state) => [
              state.canSubmit,
              state.isSubmitting,
              state.isFieldsValid,
            ]}
            children={([canSubmit, isSubmitting, isFieldsValid]) => (
              <SubmitButton
                title={t('submit')}
                disabled={!isFieldsValid || !canSubmit}
                loading={isSubmitting}
              />
            )}
          />
        </form>
      </CardContent>
    </Card>
  );
}

export default Details;
