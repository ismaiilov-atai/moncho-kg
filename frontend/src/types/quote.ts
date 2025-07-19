export interface QuoteResponseType {
  success: boolean
  author: string
  quote: QuoteType
}

type QuoteType = {
  en: string,
  ky: string,
  ru: string
}