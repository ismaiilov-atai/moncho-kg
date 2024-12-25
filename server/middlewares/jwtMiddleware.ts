import { createMiddleware } from 'hono/factory'
import type { Context, Next } from 'hono'
import { jwt } from 'hono/jwt'

export const jwtMiddleware = createMiddleware(async (c: Context, next: Next) => {
  const jwtMiddleware = jwt({
    secret: process.env.JWT_SECRET || '',
  })
  return jwtMiddleware(c, next)
})