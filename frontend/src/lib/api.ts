import { initOtpCode, verifyOtpCode } from '@/helpers/auth'
import { ACCESS_TOKEN } from '@server/types/constants'
import { queryOptions } from '@tanstack/react-query'
import { type ApiRoutes } from '@server/app'
import { getUser } from '@/helpers/user'
import { getDays } from '@/helpers/day'
import { hc } from 'hono/client'


const AUTH_TOKEN = `Bearer ${sessionStorage.getItem(ACCESS_TOKEN)}`

const client = hc<ApiRoutes>('/', {
  headers: {
    Authorization: AUTH_TOKEN,
  }
})

export const api = client.api

// helps exporting response types --- RPS
export const $day = api.days
export const $user = api.user
export const $reserve = api.reserve

export const authApi = {
  initOtpCode,
  verifyOtpCode
}

export const daysQueryOptions = queryOptions({
  queryKey: ["days"],
  queryFn: getDays,
})

export const userQueryOptions = queryOptions({
  queryKey: ["user"],
  queryFn: getUser,
})
