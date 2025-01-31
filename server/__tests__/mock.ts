import { testClient } from 'hono/testing'
import app, { type ApiRoutes } from '../app'

export interface MockAuthPostResp {
  accessToken: string
  isSuccess: boolean
  userId: string | undefined
}

export const initMockUser = async (): Promise<MockAuthPostResp> => {
  return await testClient(app as ApiRoutes).api.auth.$post({
    json: {
      name: 'Test',
      lastName: 'Testing',
      phoneNumber: '+996000000000'
    }
  }).then(res => res.json())
}

export const mockFetchUser = async (token = ''): Promise<Response> => {
  return await app.request('/api/user', {
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      Cookie: `refresh_token=${token}`
    })
  })
}