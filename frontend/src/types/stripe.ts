
export type StripeState = {
  clientSecret: string
  stripeStatus: string
}

export type StripeActions = {
  updateClientSecret: (secret: StripeState['clientSecret']) => void
  updateStripeStatus: (status: StripeState['stripeStatus']) => void
}

export interface StripeQueryResult {
  session_id: string
  guest: number
  slotId: string
}