import { InferResponseType } from 'hono'
import { $reserve } from '@/lib/api'

export type ReservetionType = InferResponseType<typeof $reserve.$post>
export type RescheduleType = InferResponseType<typeof $reserve.$put>
