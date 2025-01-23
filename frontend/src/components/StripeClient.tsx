import { loadStripe } from '@stripe/stripe-js';
import 'dotenv';
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from '@stripe/react-stripe-js';

const stripe = loadStripe(import.meta.env.VITE_STRIPE_API_KEY!, {
  betas: ['custom_checkout_beta_5'],
});

const StripeClient = ({ clientSecret }: { clientSecret: string }) => {
  return (
    <EmbeddedCheckoutProvider stripe={stripe} options={{ clientSecret }}>
      <EmbeddedCheckout className=' absolute w-full' />
    </EmbeddedCheckoutProvider>
  );
};

export default StripeClient;
