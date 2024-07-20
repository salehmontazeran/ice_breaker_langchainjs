import 'dotenv/config'

import { lookup } from './agents/linkedin_lookup_agent'
import {
    get_ice_breaker_chain,
    get_interest_chain,
    get_summary_chain,
} from './chains/custom_chains'
import { scrape_linkedin_profile } from './third_parties/linkedin'

;(async () => {
    console.time('test')

    const p = await lookup('Saleh Montazeran')
    console.log(p)
    console.timeEnd('test')
    console.time('scrape')
    const linkedin_profile = await scrape_linkedin_profile(p, false)
    const linkedin_profile_ctx = `Job headline: ${linkedin_profile['headline']} - Carear summary: ${linkedin_profile['summary']}`
    console.log(linkedin_profile_ctx)
    console.timeEnd('scrape')

    const summary_chain = get_summary_chain()
    const summary = await summary_chain.invoke({ information: linkedin_profile_ctx })
    console.log(summary)

    const interests_chain = get_interest_chain()
    const interests = await interests_chain.invoke({ information: linkedin_profile_ctx })
    console.log(interests)

    const ice_breaker_chain = get_ice_breaker_chain()
    const ice_break = await ice_breaker_chain.invoke({ information: linkedin_profile_ctx })
    console.log(ice_break)
})()
