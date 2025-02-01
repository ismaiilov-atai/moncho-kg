import { initMockUser, type MockAuthPostResp } from './mock'
import { feedDayWithSlots } from '../utils/day'
import { days } from '../db/schema/day.sch'
import { db } from '../db'
import app from '../app'

describe('Days API /days', () => {
  let authUser: MockAuthPostResp
  let result: any

  beforeAll(async () => {
    authUser = await initMockUser()
    await feedDayWithSlots()
    const response = await app.request('api/days', {
      headers: new Headers({
        Cookie: `refresh_token=${authUser.accessToken}`
      })
    })
    result = await response.json()
  })

  afterAll(async () => {
    await db.delete(days)
  })

  it('should return days no more than 7 days', () => {
    expect(result.days.length).toBeLessThanOrEqual(7)
  })

  it('should return days more than 0', () => {
    expect(result.days.length).toBeGreaterThan(0)
  })
  
  it('each day should have 11 slots', () => {
    expect(result.days[0].slots.length).toBe(11)
  })

})