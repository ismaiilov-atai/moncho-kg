interface Booking {
  bookingId: string
  withYou: number
  status: "pending" | "confirmed" | "failed" | null
  when: string
}

export interface UserType {
  name?: string | undefined
  userId?: string | undefined
  lastName?: string | undefined
  phoneNumber?: string | undefined
  beenTimes?: number | undefined
  reservations: Booking[]
}