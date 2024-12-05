import { z } from 'zod'

interface Link {
  rel: string,
  href: string,
  method: string
}

interface SMS {
  template: string,
  interceptionTimeout: number
}

export interface InitOtpType {
  id: string,
  method: string,
  "_links": Link[],
  sms: SMS
}

export interface VerifyError {
  status: string,
  errorCode: number,
  message: string
}

export interface VerificationReport {
  id: string,
  method: string,
  status: string,
  reason: string
}

export type AuthState = {
  name: string;
  lastName: string;
  phoneNumber: string;
  pageCount: number;
}

export type AuthActions = {
  updateFirstName: (name: AuthState['name']) => void;
  updateLastName: (lastName: AuthState['lastName']) => void;
  updatePhoneNumber: (phoneNumber: AuthState['phoneNumber']) => void;
  forwardAuthPage: (pageCount: AuthState['pageCount']) => void;
  backwardsAuthPage: (pageCount: AuthState['pageCount']) => void;
};

export interface ValidatorsType {
  onChange: z.ZodString;
  onChangeAsyncDebounceMs: number;
  onChangeAsync: z.ZodEffects<z.ZodString>;
}