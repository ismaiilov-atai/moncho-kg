import { Payload } from '@server/types/auth-types'

export interface JWT_FAILURE {
  message: string
}

export interface JWT_Payload {
  payload: Payload,
  success: boolean
  token: string
}