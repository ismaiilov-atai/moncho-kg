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


export const getQuote = async (ctx: Context): Promise<string> => {
  try {
    const response = await geminiAI.models.generateContent({
      model: "gemini-1.5-flash",
      contents: `Give me a quote from world wide that motivates people In 3 languages, Kyrgyz, Russian, English. `,
      config: {
        responseMimeType: 'application/json',
        responseJsonSchema: schema,
        systemInstruction: `Put Kyrgyz quote in ky property, Russian in ru and English to en property to schema. Protect all the religions and people ethnicity. Make sure it does not repeat itself. Randomize, each time give new ones.`
      },
    })
    return response.text || ''
  } catch (error) {
    throw error
  }
}