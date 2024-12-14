import { insertUserSchema } from '../db/schema/user.sch'
import { insertUser, JWTify } from '../utils/auth-helpers'
import { createUserSchema } from '../types/auth-types'
import { REFRESH_TOKEN } from '../types/constants'
import { zValidator } from '@hono/zod-validator'
import { setCookie } from 'hono/cookie'
import { Hono } from 'hono'


export const auth = new Hono()
  .post('/', zValidator('json', createUserSchema), async c => {
    try {
      const body = c.req.valid('json');
      const validUser = insertUserSchema.parse({ ...body });
      const createdUser = await insertUser(validUser);
      const accessToken = await JWTify({
        phoneNumber: createdUser.phoneNumber,
        userId: createdUser.userId,
        name: createdUser.name,
        lastName: createdUser.lastName
      });
      const refreshToken = await JWTify({
        phoneNumber: createdUser.phoneNumber,
        userId: createdUser.userId,
        name: createdUser.name
      }, Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30)
      setCookie(c, REFRESH_TOKEN, refreshToken.token, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60
      })
      return c.json(accessToken, 201);
    } catch (error) {
      throw error;
    }
  })
