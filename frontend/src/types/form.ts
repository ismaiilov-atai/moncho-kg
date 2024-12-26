import { z } from 'zod';

export const userInfoSchema = z.object({
  name: z.string().min(3, 'Name should at least be 3 characters long'),
  lastName: z.string().min(3, 'Last name must be at least 3 characters'),
});
export type User = z.infer<typeof userInfoSchema>;

export const otpSchema = z.object({
  otpCode: z.string().min(4, 'Should be 4 digits'),
});
export type OTP_CODE = z.infer<typeof otpSchema>;

export const numberSchema = z.object({
  phoneNumber: z
    .string()
    .refine((value) => /^\+996\(\d{3}\) \d{2}-\d{2}-\d{2}$/.test(value)),
});
export type PhoneType = z.infer<typeof numberSchema>;