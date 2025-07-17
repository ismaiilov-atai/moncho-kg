import { getQuote } from '../utils/ai'
import { Hono } from 'hono'


export const quote = new Hono()
  .get('/', async (c) => {
    const response = await getQuote(c)
    return c.json({ sucess: true, ...JSON.parse(response) })
  })