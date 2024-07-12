import { PromptTemplate } from '@langchain/core/prompts'
import { AgentExecutor, createReactAgent } from 'langchain/agents'
import { pull } from 'langchain/hub'
import { DynamicStructuredTool } from 'langchain/tools'
import { z } from 'zod'

import { get_profile_url_tavily } from '../tools'
import { open_ai_llm as llm } from '../usable_resources'

export const lookup = async (name: string) => {
    const template = `given the full name {name_of_person} I want you to get it me a link to their Linkedin profile page.
                          Your answer should contain only a URL`
    const prompt_template = new PromptTemplate({ template, inputVariables: ['name_of_person'] })

    const tools_for_agent = [
        new DynamicStructuredTool({
            name: 'Crawl Google 4 linkedin profile page',
            description: 'useful for when you need get the Linkedin Page URL',
            schema: z.object({
                name: z.string(),
            }),
            func: get_profile_url_tavily,
        }),
    ]

    const react_prompt = await pull<PromptTemplate>('hwchase17/react')

    const agent = await createReactAgent({
        llm,
        tools: tools_for_agent,
        prompt: react_prompt,
    })

    const agent_executer = new AgentExecutor({
        agent,
        tools: tools_for_agent,
        // verbose: true,
    })

    const res = await agent_executer.invoke({
        input: {
            input: await prompt_template.formatPromptValue({
                name_of_person: name,
            }),
        },
    })

    console.log(res)
}
