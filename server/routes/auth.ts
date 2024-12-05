import { Hono } from 'hono'



export const auth = new Hono()
  .put('/', c => {
    return c.json({ isAuth: true })
  })
