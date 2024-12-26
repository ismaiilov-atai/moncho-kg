import { ReactFormExtendedApi, Validator } from '@tanstack/react-form'
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ZodType, ZodTypeDef } from 'zod'
import moment from 'moment'


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const onFormSubmit = <T>(
  e: React.FormEvent<HTMLFormElement>,
  form: ReactFormExtendedApi<T, Validator<unknown, ZodType<any, ZodTypeDef, any>>>
) => {
  e.preventDefault()
  e.stopPropagation()
  form.handleSubmit()
}

export const greeting = () => {
  const hour = moment().hour()
  if (hour > 16) {
    return 'Good evening'
  } else if (hour > 11) {
    return 'Good afternoon'
  }
  return 'Good morning'
}


