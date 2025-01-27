
import { StripeActions, StripeState } from '@/types/stripe'
import { create } from 'zustand/react'

export const useStripeStore = create<StripeState & StripeActions>((set) => ({
  clientSecret: '',
  stripeStatus: '',
  updateClientSecret: (secret) => set(() => ({ clientSecret: secret })),
  updateStripeStatus: (status) => set(() => ({ stripeStatus: status }))
}))
