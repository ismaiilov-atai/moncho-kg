import { sign } from 'hono/jwt';
import { db } from '../db';
import { usersTable } from '../db/schema/user_schema';
import type { InsertUserResponseType, NewUser } from '../types/auth-types';

export const insertUser = async (user: NewUser): Promise<NewUser> => {
  const newUser = await db
    .insert(usersTable)
    .values(user)
    .onConflictDoUpdate({ target: usersTable.phoneNumber, set: user })
    .returning();

  return newUser[0];
}

export const JWTify = async (createdUser: NewUser): Promise<InsertUserResponseType> => {
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