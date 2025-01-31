import { initMockUser, mockFetchUser, type MockAuthPostResp } from './mock'
import { type UserType } from '../types/user'
import { users } from '../db/schema/user.sch'
import { db } from '../db'

let authResp: MockAuthPostResp
let user: UserType
let result: any

describe('User API /user positive cases', async () => {
  beforeAll(async () => {
    authResp = await initMockUser()
    result = await (await mockFetchUser(authResp.accessToken)).json()
    user = result.user
  })

  afterAll(async () => {
    db.delete(users)
  })

  it('should have token', () => {
    expect(result.token).toBe(authResp.accessToken)
  })

  it('should return user with id', async () => {
    expect(user.userId).toBe(authResp.userId)
  })

  it('should return user with id', async () => {
    expect(user.userId).toBe(authResp.userId)
  })
})




