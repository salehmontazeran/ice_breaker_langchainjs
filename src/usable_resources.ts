import { ChatGroq } from '@langchain/groq'
import { ChatOpenAI } from '@langchain/openai'

export const open_ai_llm = new ChatOpenAI({
    apiKey: process.env.OPENAI__API_KEY,
    model: 'gpt-4o',
    temperature: 1,
})

export const groq_llm = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: 'llama3-groq-8b-8192-tool-use-preview',
})

export const general_llm = groq_llm
