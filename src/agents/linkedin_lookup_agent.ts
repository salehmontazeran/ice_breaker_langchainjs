import { PromptTemplate } from '@langchain/core/prompts'
import { DynamicTool } from '@langchain/core/tools'
import { AgentExecutor, createReactAgent } from 'langchain/agents'
import { pull } from 'langchain/hub'

import { get_profile_url_tavily } from '../tools'
import { open_ai_llm as llm } from '../usable_resources'

export const lookup = async (name: string) => {
    const template = `given the full name {name_of_person} I want you to get it me a link to their Linkedin profile page.
                          Your answer should contain only a URL`
    const prompt_template = new PromptTemplate({ template, inputVariables: ['name_of_person'] })

    const tools = [
        new DynamicTool({
            name: 'Crawl Google for linkedin profile page',
            description: 'useful for when you need get the Linkedin Page URL',
            func: get_profile_url_tavily,
        }),
    ]

    const react_prompt = await pull<PromptTemplate>('hwchase17/react')

    const agent = await createReactAgent({
        llm,
        tools,
        prompt: react_prompt,
    })

    const agent_executer = new AgentExecutor({
        agent,
        tools,
        // verbose: true,
    })

    const res = await agent_executer.invoke({
        input: await prompt_template.format({
            name_of_person: name,
        }),
    })

    const linked_profile_url = res['output']
    return linked_profile_url
}
