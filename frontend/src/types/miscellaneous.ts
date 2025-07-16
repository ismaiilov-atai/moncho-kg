import { QueryClient } from '@tanstack/react-query'

export interface BeforeLoadContextType {
  context: { queryClient: QueryClient }
}