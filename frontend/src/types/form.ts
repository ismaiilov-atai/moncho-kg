import { ONLY_ALPHABET_REGEX } from '@/lib/constants'
import { t } from 'i18next'
import { z } from 'zod'



export const userInfoSchema = z.object({
  name: z.string()
    .min(3, t('min-chars-input'))
    .regex(ONLY_ALPHABET_REGEX, t('only-alphabets')),
  lastName: z.string()
    .min(3, t('min-chars-input'))
    .regex(ONLY_ALPHABET_REGEX, t('only-alphabets')),
})
export type User = z.infer<typeof userInfoSchema>

export const otpSchema = z.object({
  otpCode: z.string().min(4, 'Should be 4 digits'),
})
export type OTP_CODE = z.infer<typeof otpSchema>

export const numberSchema = z.object({
  phoneNumber: z
    .string()
    .refine((value) => /^\+996\(\d{3}\) \d{2}-\d{2}-\d{2}$/.test(value)),
})
export type PhoneType = z.infer<typeof numberSchema>