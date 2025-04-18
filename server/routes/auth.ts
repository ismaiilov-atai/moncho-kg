import { findUserByPhoneNumber, insertUser } from '../utils/auth-helpers'
import { createUserSchema, PhoneType } from '../types/auth'
import { insertUserSchema } from '../db/schema/user.sch'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'


export const auth = new Hono()
  .get('/', zValidator('query', PhoneType),
    async c => {
      try {
        const { phoneNumber } = c.req.valid('query')
        
        const userFound = await findUserByPhoneNumber(phoneNumber)

        return c.json({ success: true, user: { name: userFound?.name, lastName: userFound?.lastName }, msg: null }, 200)
      } catch (error) {
        return c.json({ success: false, user: null, msg: 'User does not exist, sign-up please' }, 404)
      }
    })
  .post('/', zValidator('json', createUserSchema), async c => {
    try {
      const body = c.req.valid('json')
      const validUser = insertUserSchema.parse({ ...body })
      const createdUser = await insertUser(validUser)
      return c.json({ isSuccess: true, userId: createdUser.userId }, 201)
    } catch (error) {
      throw error
    }
  })

