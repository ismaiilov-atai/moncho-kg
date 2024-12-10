import type { TokenHeader } from 'hono/utils/jwt/jwt'
import { insertUserSchema } from '../db/schema/user_schema'
import type { z } from 'zod'

export type NewUser = z.infer<typeof insertUserSchema>

export type RefreshTokenUserType = Omit<NewUser, 'lastName' | 'id'>
export type AccessTokenUserType = Omit<NewUser, 'id'>

export type Payload = {
  sub: string,
  exp: number,
  user: AccessTokenUserType
}
export type Decoded = {
  header: TokenHeader,
  payload: Payload
}

export interface RefreshCookie {
  token: string,
  isSuccess: true
}

export interface InsertUserResponseType {
  token: string, isSuccess: boolean
}

export const createUserSchema = insertUserSchema.omit({
  userId: true,
  id: true
})

export type CreateUser = z.infer<typeof createUserSchema>