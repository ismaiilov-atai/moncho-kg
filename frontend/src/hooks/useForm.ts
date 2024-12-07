import { useForm as useBaseForm } from '@tanstack/react-form';
import { toast } from './use-toast';

export const useForm = <T extends Record<string, any>, B>({
  defaultValues,
  onSubmit,
  validatorAdapter,
  validators,
}: {
  defaultValues: T;
  onSubmit: (values: T) => Promise<void> | void;
  validatorAdapter?: () => any;
  validators?: Record<keyof B, any>;
}) => {
  return useBaseForm({
    defaultValues,
    onSubmit: async ({ value }: { value: T }) => {
      try {
        await onSubmit(value);
      } catch (error) {
        toast({
          title: 'OOOPS',
          description: (error as Error).message || 'Something went wrong.',
          duration: 2000,
          variant: 'destructive',
        });
      }
    },
    validatorAdapter,
    validators,
  });
};