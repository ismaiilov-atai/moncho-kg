
import { findUserWithId, updateUserBeenTimes } from '../utils/user'
import { insertReservation } from '../utils/reservation'
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
    try {
      const { slotId, userId, guest } = c.req.query()
      const user = await findUserWithId(userId)
      if (!user) throw Error('User does not exist')

      if (user.beenTimes < 4) {
        const session = await stripe.checkout.sessions.create({
          line_items: [
            {
              price_data: {
                currency: 'kgs',
                product_data: { name: 'Moncho-KG' },
                unit_amount_decimal: '10000'
              },
              quantity: Number(guest) + 1,
            },
          ],
          mode: 'payment',
          ui_mode: 'embedded',
          submit_type: 'book',
          payment_method_types: ['card'],
          locale: 'auto',
          return_url: `${process.env.BASE_URL}/book-session?session_id={CHECKOUT_SESSION_ID}&slotId=${slotId}&guest=${guest}&userId=${userId}`,
        })
        return c.json({ clientSecret: session.client_secret, bookingParams: null, newReso: null })
      }
      const newReso = await insertReservation({
        slotId,
        userId,
        withYou: Number(guest)
      })
      await updateUserBeenTimes(userId, user.beenTimes + 1)

      return c.json({
        clientSecret: null,
        bookingParams: {
          session_id: 'reward',
          slotId,
          guest,
          userId,
        },
        newReso
      })
    } catch (error) {
      return c.json({ clientSecret: null, bookingParams: null }, 400)
    }

  })