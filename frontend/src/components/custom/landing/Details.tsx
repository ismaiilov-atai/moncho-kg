import { z } from 'zod';
import InputWithIcon from '../InputWithIcon';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { useTranslation } from 'react-i18next';
import { User, userInfoSchema } from '@/types/form';
import { onFormSubmit } from '@/lib/utils';
import { useUserStore } from '@/stores/user-store';
import { ValidatorsType } from '@/types/auth';
import { useForm } from '@/hooks/useForm';
import SubmitButton from '../SubmitButton';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../ui/card';

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

const resolveSleeper = async (value: string): Promise<boolean> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return !value.includes('error');
};

function Details() {
  const { t } = useTranslation();
  const { pageCount, forwardAuthPage, updateFirstName, updateLastName } =
    useUserStore((state) => state);
  const form = useForm({
    defaultValues: {
      name: '',
      lastName: '',
    } as User,
    onSubmit: async (value) => {
      updateFirstName(value.name);
      updateLastName(value.lastName);
      forwardAuthPage(pageCount);
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: userInfoSchema,
    },
  });

  return (
    <Card className='w-3/4 lg:max-2xl:w-1/2 h-3/4 '>
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
        <CardDescription>
          Please provide your information in order to address you proper way.
        </CardDescription>
      </CardHeader>
      <CardContent className='place-self-center h-2/3 w-full md:max-2xl:w-3/4 '>
        <form
          className='flex flex-col justify-between h-full'
          onSubmit={(e) => onFormSubmit(e, form)}>
          <div className='flex flex-col space-y-6 mt-auto mb-auto'>
            <form.Field
              name='name'
              validators={createValidators('name')}
              children={(field) => <InputWithIcon field={field} lableText={'Name'}/>}
            />
            <form.Field
              name='lastName'
              validators={createValidators('lastName')}
              children={(field) => <InputWithIcon field={field} lableText={'Last name'}/>}
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
                title='Submit'
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
