
import { Hono } from 'hono'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_API_KEY || '')

export const checkout = new Hono()
  .get('/', async c => {
    const session_id = c.req.query('session_id')

    const session = await stripe.checkout.sessions.retrieve(session_id!)

    return c.json({
      status: session.status,
      customer_email: session.customer_details!.email
    })
  })
  .post('/', async (c) => {
    const { guest, slotId } = c.req.query()
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'kgs',
            product_data: {
              name: 'Moncho Price',
            },

            unit_amount_decimal: '10000'
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      ui_mode: 'embedded',
      submit_type: 'book',
      payment_method_types: ['card'],
      return_url: `${process.env.BASE_URL}/?session_id={CHECKOUT_SESSION_ID}&slotId=${slotId}&guest=${guest}`,
    })

    return c.json({ clientSecret: session.client_secret })
  })