import { ChatOpenAI } from '@langchain/openai'
import 'dotenv/config'

;(async () => {
    const chatModel = new ChatOpenAI({
        apiKey: process.env.OPENAI__API_KEY,
        model: 'gpt-3.5-turbo',
    })

    const r = await chatModel.invoke('What are you?')
    console.log(r.content)
})()
