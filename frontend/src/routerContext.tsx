import { QueryClient } from '@tanstack/react-query';
import { t } from 'i18next';

export type RouterContext = {
  queryClient: QueryClient;
  translation: typeof t | undefined;
};
