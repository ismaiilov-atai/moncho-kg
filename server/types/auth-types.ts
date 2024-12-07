import type { z } from 'zod'
import { insertUserSchema } from '../db/schema/user_schema'

export type NewUser = z.infer<typeof insertUserSchema>

export interface InsertUserResponseType {
  token: string, isSuccess: boolean
}

export const createUserSchema = insertUserSchema.omit({
  userId: true,
  id: true
})

export type CreateUser = z.infer<typeof createUserSchema>