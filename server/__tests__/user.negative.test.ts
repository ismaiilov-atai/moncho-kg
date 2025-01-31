import { JwtTokenExpired, JwtTokenInvalid } from 'hono/utils/jwt/types'
import { users } from '../db/schema/user.sch'
import { mockFetchUser } from './mock'
import { db } from '../db'

let result: any
const dummyToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyMzkwMjN9.xD3YzV7OgJ2Sm8Z1YV4kZ5iLDZSK4IqU7H7dyQbn-xY'

describe('User API /user negative cases', () => {
  beforeAll(async () => {
    result = await (await mockFetchUser(dummyToken)).json()
  })
  afterAll(async () =>
    await db.delete(users)
  )
  it('should return JwtTokenExpired if users token expired', async () => {
    expect(result.success).toBeFalsy()
    expect(result.err).toEqual(JwtTokenExpired)
  })
  it('should return JwtTokenInvalid if users token is not good', async () => {
    result = await (await mockFetchUser()).json()
    expect(result.success).toBeFalsy()
    expect(result.err).toEqual(JwtTokenInvalid)
  })
})
