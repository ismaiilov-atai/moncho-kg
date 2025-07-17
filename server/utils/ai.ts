import { GoogleGenAI } from '@google/genai'
import type { Context } from 'hono'
import { LANG } from './constants'

const geminiAI = new GoogleGenAI({})

const schema = {
  type: "object",
  properties: {
    quoute: { type: "string" },
    author: { type: "string" },
  },
}


export const getQuote = async (ctx: Context): Promise<string> => {
  try {
    const langParam = ctx.req.param('lang')
    const Language = LANG[langParam] || 'English'

    const response = await geminiAI.models.generateContent({
      model: "gemini-1.5-flash",
      contents: `In ${Language} language. Give me a quote from world wide that motivates people`,
      config: {
        responseMimeType: 'application/json',
        responseJsonSchema: schema,
        systemInstruction: `Protect all the religions and people ethnicity. Make sure it does not repeat itself. Randomize, each time give new ones.`
      },
    })
    return response.text || ''
  } catch (error) {
    throw error
  }
}