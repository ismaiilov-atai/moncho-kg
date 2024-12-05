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