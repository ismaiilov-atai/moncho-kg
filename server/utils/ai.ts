import { GoogleGenAI } from '@google/genai'
import type { Context } from 'hono'

const geminiAI = new GoogleGenAI({})

const schema = {
  type: "object",
  properties: {
    quote: {
      properties: {
        ru: { type: 'string' },
        ky: { type: 'string' },
        en: { type: 'string' },
      },
      type: "object"
    },
    author: { type: "string" },
  },
}

interface QuoteType {
  quote: {
    ru: string,
    ky: string,
    en: string
  },
  author: string
}

export const getQuote = async (ctx: Context): Promise<QuoteType> => {
  try {
    const response = await geminiAI.models.generateContent({
      model: "gemini-1.5-flash",
      contents: `Give me a quote from famous person in 3 languages.`,
      config: {
        responseMimeType: 'application/json',
        responseJsonSchema: schema
      },
    })
    return JSON.parse(response.text!)
  } catch (error) {
    throw error
  }
}