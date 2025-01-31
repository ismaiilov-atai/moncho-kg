import { initMockUser, type MockAuthPostResp } from './mock'
import { users } from '../db/schema/user.sch'
import dotenv from 'dotenv'
import { db } from '../db'

dotenv.config({ path: '.env.test' })


describe('Auth API tests', () => {
  let newUser: MockAuthPostResp
  beforeAll(async () => {
    newUser = await initMockUser()
  })

  afterAll(async () =>
    await db.delete(users)
  )

  it('should grant access token', () => {
    expect(newUser.accessToken).toBeDefined()
  })

  it('should have new created user ID', () => {
    expect(newUser.userId).toBeDefined()
  })

  it('should isSuccess should be truthy', () => {
    expect(newUser.isSuccess).toBeTruthy()
  })

  it('should have user in db', async () => {
    const users = await db.query.users.findMany()
    expect(users.length).toBeGreaterThan(0)
  })
})
