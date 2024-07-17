// import { ChatOpenAI } from '@langchain/openai'
import { PromptTemplate } from '@langchain/core/prompts'
import 'dotenv/config'

import { lookup } from './agents/linkedin_lookup_agent'
// import { get_profile_url_tavily } from './tools' // import { scrape_linkedin_profile } from './third_parties/linkedin'
import { scrape_linkedin_profile } from './third_parties/linkedin'
import troweb_ctx from './tw_ctx'
import { open_ai_llm } from './usable_resources'

const template = `
This is information for a person: {linkedin_profile_ctx}
Also this is some useful information about Troweb: {troweb_ctx}

You are a sale agent. with information about person and information about Troweb, tell me how Troweb can help my person? Just tell how without any additional things.
Give me maximum a paragraph in friendly and kine tone. imagine you are speaking to my person 1 to 1.
`

;(async () => {
    const linkedin_url = await lookup('Saleh')
    const linkedin_profile = await scrape_linkedin_profile(linkedin_url)
    const linkedin_profile_ctx = `Job headline: ${linkedin_profile['headline']} - Carear summary: ${linkedin_profile['summary']}`
    console.log(linkedin_profile)

    const promptTemplate = PromptTemplate.fromTemplate(template)

    const res = await open_ai_llm.invoke(
        await promptTemplate.format({
            linkedin_profile_ctx,
            troweb_ctx,
        }),
    )
    console.log(res.content)
})()
