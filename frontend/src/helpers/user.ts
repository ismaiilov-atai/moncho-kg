import { JWT_FAILURE, JWT_Payload } from '@/types/shared-types';
import { ACCESS_TOKEN } from '@server/types/constants';

const authHeader = {
  'Authorization': `Bearer ${sessionStorage.getItem(ACCESS_TOKEN)}`,
}

/**
 * JWT_FAILURE = return type of hono JWT middlware
 * @returns JWT_FAILURE | JWT_Payload
 */
export const getUser = async (): Promise<JWT_FAILURE | JWT_Payload> => {
  try {
    const resp = await fetch(`/api/user`, {
      method: 'GET',
      headers: authHeader,
    })
    const result = await resp.json();
    if ('err' in result) throw result
    return result as JWT_Payload;
  } catch (error) {
    throw error;
  }
}