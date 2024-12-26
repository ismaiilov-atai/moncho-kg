import { Payload } from '@server/types/auth'

export interface GenaralError {
  success: boolean,
  message: string
}

export interface JWT_FAILURE {
  err: Error
}

export interface JWT_Payload {
  payload: Payload,
  success: boolean
  token: string
}