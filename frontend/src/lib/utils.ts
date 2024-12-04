import { ReactFormExtendedApi, Validator } from '@tanstack/react-form';
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ZodType, ZodTypeDef } from 'zod';


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const onFormSubmit = <T>(
  e: React.FormEvent<HTMLFormElement>,
  form: ReactFormExtendedApi<T, Validator<unknown, ZodType<any, ZodTypeDef, any>>>
) => {
  e.preventDefault();
  e.stopPropagation();
  form.handleSubmit();
};