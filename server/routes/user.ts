import type { Payload } from '../types/auth-types';
import { Hono } from 'hono';


export const user = new Hono()
  .get('/', (c) => {
    const auth = c.req.header('Authorization');
    const payload = c.get('jwtPayload') as Payload
    return c.json({ success: true, payload, token: auth?.replace(/^Bearer\s/, '') })
  })