
import { ACCESS_TOKEN } from '@server/types/constants'
import { JWT_FAILURE } from '@/types/shared'
import { User } from '@/types/user'
import { $user } from '@/lib/api'

const AUTH_TOKEN = `Bearer ${sessionStorage.getItem(ACCESS_TOKEN)}`

/**
 * JWT_FAILURE = return type of hono JWT middlware
 * @returns JWT_FAILURE | UserResponse
 */
export const getUser = async (): Promise<User | JWT_FAILURE> => {
  try {
    const response = await $user.$get({
      headers: {
        Authorization: AUTH_TOKEN,
      }
    })
    const user = await response.json()

    if ('err' in user || !user.success) throw user
    return user
  } catch (error) {
    throw error
  }
}