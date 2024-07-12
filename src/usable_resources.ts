import { ChatOpenAI } from '@langchain/openai'

export const open_ai_llm = new ChatOpenAI({
    apiKey: process.env.OPENAI__API_KEY,
    model: 'gpt-3.5-turbo',
    temperature: 0,
})
