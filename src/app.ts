// import { ChatOpenAI } from '@langchain/openai'
import 'dotenv/config'

import { scrape_linkedin_profile } from './third_parties/linkedin'

;(async () => {
    // const chatModel = new ChatOpenAI({
    //     apiKey: process.env.OPENAI__API_KEY,
    //     model: 'gpt-3.5-turbo',
    // })
    // const r = await chatModel.invoke('What are you?')
    // console.log(r.content)

    const r = await scrape_linkedin_profile('linkedin.com/in/salehmontazeran')
    console.log(r)
})()
