import { JwtTokenExpired } from 'hono/utils/jwt/types'
import { REFRESH_TOKEN } from '../types/constants'
import { createMiddleware } from 'hono/factory'
import { JWTify } from '../utils/auth-helpers'
import { findUserWithId } from '../utils/user'
import type { Decoded } from '../types/auth'
import type { Context, Next } from 'hono'
import { decode, verify } from 'hono/jwt'
import { getCookie } from 'hono/cookie'



export const refreshToken = createMiddleware(async (c: Context, next: Next) => {
  const auth = c.req.header('Authorization')
  const refreshRawToken = getCookie(c, REFRESH_TOKEN)

  try {
    const resp = await verify(auth || '', process.env.JWT_SECRET!)
    if (resp.exp || 1000 < Date.now() + 1000) {
      throw new JwtTokenExpired('')
    }
  } catch (error) {
    const refreshValid = await verify(refreshRawToken || '', process.env.JWT_SECRET || '')
    if (refreshValid.exp || 1000 > Date.now() + 1000) {
      const req = new Request(c.req.raw)
      const { payload } = decode(refreshRawToken || '') as Decoded
      const user = await findUserWithId(payload.sub)
      if (!user) throw error
      const newAccessToken = await JWTify({
        ...payload.user
      })

      req.headers.set('Authorization', `Bearer ${newAccessToken}`)
      c.req.raw = req
    } else throw new JwtTokenExpired('')
  }
  await next()
})