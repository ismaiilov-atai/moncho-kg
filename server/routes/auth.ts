import { Hono } from 'hono'
import { createUserSchema } from '../types/auth-types';
import { insertUserSchema } from '../db/schema/user_schema';
import { zValidator } from '@hono/zod-validator'
import { insertUser, JWTify } from '../utils/auth-helpers';

export const auth = new Hono()
  .post('/', zValidator('json', createUserSchema), async c => {
    try {
      const body = c.req.valid('json');
      const validUser = insertUserSchema.parse({ ...body });
      const createdUser = await insertUser(validUser);
      const jwt = await JWTify(createdUser);
      return c.json(jwt, 201);
    } catch (error) {
      throw error;
    }
  })


