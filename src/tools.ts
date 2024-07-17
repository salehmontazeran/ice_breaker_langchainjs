import { TavilySearchResults } from '@langchain/community/tools/tavily_search'

export const get_profile_url_tavily = async (name: string) => {
    const search = new TavilySearchResults({
        apiKey: process.env.TAVILY__API_KEY,
        maxResults: 1,
    })
    const data: any = JSON.parse(await search.invoke(`${name}`))
    return data[0]['url']
}
