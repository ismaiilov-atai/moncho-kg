import { Hono } from 'hono'
import { db } from '../db';
import { insertUserSchema, usersTable } from '../db/schema/user_schema';
import { decode, sign, verify } from 'hono/jwt'
import type { z } from 'zod';
import { HTTPException } from 'hono/http-exception';

type NewUser = z.infer<typeof insertUserSchema>

export const insertUser = async (user: NewUser): Promise<NewUser> => {
  const newUser = await db
    .insert(usersTable)
    .values(user)
    .returning();

  return newUser[0];
}

const JWTify = async (createdUser: NewUser): Promise<{ token: string, isSuccess: boolean }> => {
  const payload = {
    sub: createdUser.userId,
    exp: Math.floor(Date.now() / 1000) + 60 * 5,
    user: {
      userId: createdUser.userId,
      name: createdUser.name,
      lastName: createdUser.lastName,
      phoneNumber: createdUser.phoneNumber,
      role: 'user'
    }
  }
  const token = await sign(payload, process.env.JWT_SECRET || '');
  return { token, isSuccess: true };
}

export const auth = new Hono()
  .post('/', async c => {
    try {
      const body = await c.req.json();
      const validUser = insertUserSchema.parse({ ...body });
      const createdUser = await insertUser(validUser);
      const jwt = await JWTify(createdUser);
      return c.json(jwt, 201);
    } catch (error) {
      if ((error as Error).message.includes('users_phone_number_unique')) {
        throw new HTTPException(409, { message: 'User exist, try to login' })
      }
      throw error;
    }
  })


