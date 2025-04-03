import { insertUserSchema } from '../db/schema/user.sch'
import { insertUser } from '../utils/auth-helpers'
import { createUserSchema } from '../types/auth'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'


export const auth = new Hono()
  .post('/', zValidator('json', createUserSchema), async c => {
    try {
      const body = c.req.valid('json')
      const validUser = insertUserSchema.parse({ ...body })
      const createdUser = await insertUser(validUser)
      return c.json({ isSuccess: true, userId: createdUser.userId }, 201,)
    } catch (error) {
      throw error
    }
  })
