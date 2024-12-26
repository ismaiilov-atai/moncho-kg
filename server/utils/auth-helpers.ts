import type { AccessTokenUserType, NewUser, RefreshTokenUserType } from '../types/auth'
import { users } from '../db/schema/user.sch'
import { sign } from 'hono/jwt'
import { db } from '../db'


export const insertUser = async (user: NewUser): Promise<NewUser> => {
  const newUser = await db
    .insert(users)
    .values(user)
    .onConflictDoUpdate({ target: users.phoneNumber, set: user })
    .returning()

  return newUser[0]
}

export const JWTify = async (user: AccessTokenUserType | RefreshTokenUserType, expiresIn: number = Math.floor(Date.now() / 1000) + 60 * 5): Promise<string> => {
  const payload = {
    sub: user.userId,
    exp: expiresIn,
    user: {
      ...user,
      role: 'user'
    }
  }
  const token = await sign(payload, process.env.JWT_SECRET || '')
  return token
}