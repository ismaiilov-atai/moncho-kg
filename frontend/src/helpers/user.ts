
import { User } from '@/types/user-types'
import { JWT_FAILURE } from '@/types/shared-types'
import { $user } from '@/lib/api'

/**
 * JWT_FAILURE = return type of hono JWT middlware
 * @returns JWT_FAILURE | UserResponse
 */
export const getUser = async (): Promise<User | JWT_FAILURE> => {
  try {
    const response = await $user.$get()
    const user = await response.json()

    if ('err' in user || !user.success) throw user
    return user
  } catch (error) {
    throw error
  }
}