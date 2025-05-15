import * as hourlyStats from './schema/hourly_stats.sch'
import * as bookingsToSlots from './schema/bookings_to_slots'
import * as usersToBooking from './schema/users_to_booking'
import * as bookingSchema from './schema/booking.sch'
import { drizzle } from 'drizzle-orm/node-postgres'
import * as statistics from './schema/stats.sch'
import * as slotSchema from './schema/slot.sch'
import * as userSchema from './schema/user.sch'
import * as daySchema from './schema/day.sch'
import 'dotenv/config'

// You can specify any property from the node-postgres connection options
export const db = drizzle({
  connection: {
    connectionString: process.env.DATABASE_URL!,
  },
  casing: 'snake_case',
  schema: {
    ...userSchema,
    ...slotSchema,
    ...daySchema,
    ...bookingSchema,
    ...bookingsToSlots,
    ...usersToBooking,
    ...hourlyStats,
    ...statistics
  }
})