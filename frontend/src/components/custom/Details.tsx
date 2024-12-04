import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Button } from '../ui/button';
import InputWithIcon from './InputWithIcon';

import { z } from 'zod';
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { useTranslation } from 'react-i18next';
import { User, userInfoSchema } from '@/types/form-types';
import { onFormSubmit } from '@/lib/utils';
import { AuthPageProps } from '@/types/shared-types';

interface ValidatorsType {
  onChange: z.ZodString;
  onChangeAsyncDebounceMs: number;
  onChangeAsync: z.ZodEffects<z.ZodString>;
}

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

function Details({ page, setPage }: AuthPageProps) {
  const { t } = useTranslation();
  const form = useForm({
    defaultValues: {
      name: '',
      lastName: '',
      phone: '',
    } as User,
    onSubmit: async ({ value }) => {
      // do sumbit here
      setPage(page + 1);
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
              children={(field) => <InputWithIcon field={field} />}
            />
            <form.Field
              name='lastName'
              validators={createValidators('lastName')}
              children={(field) => <InputWithIcon field={field} />}
            />
          </div>
          <form.Subscribe
            selector={(state) => [
              state.canSubmit,
              state.isSubmitting,
              state.isFieldsValid,
            ]}
            children={([canSubmit, isSubmitting, isFieldsValid]) => (
              <Button
                type='submit'
                disabled={!isFieldsValid || !canSubmit}
                className=' '>
                {isSubmitting ? '...' : 'Submit'}
              </Button>
            )}
          />
        </form>
      </CardContent>
    </Card>
  );
}

export default Details;
