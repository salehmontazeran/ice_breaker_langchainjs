import { PromptTemplate } from '@langchain/core/prompts'
import { RunnableSequence } from '@langchain/core/runnables'

import { ice_breaker_parser, summary_parser, topic_of_interest_parser } from '../output_parsers'
import { open_ai_llm } from '../usable_resources'

export const get_summary_chain = () => {
    const template = `
         given the information about a person from linkedin {information}, I want you to create:
         1. a short summary
         2. two interesting facts about them
         \n{format_instructions}
     `
    const propmpt_template = new PromptTemplate({
        inputVariables: ['information'],
        template: template,
        partialVariables: {
            format_instructions: summary_parser.getFormatInstructions(),
        },
    })

    return RunnableSequence.from([propmpt_template, open_ai_llm, summary_parser])
}

export const get_interest_chain = () => {
    const template = `
         given the information about a person from linkedin {information}, I want you to create:
         3 topics that might interest them
        \n{format_instructions}
     `
    const propmpt_template = new PromptTemplate({
        inputVariables: ['information'],
        template: template,
        partialVariables: {
            format_instructions: topic_of_interest_parser.getFormatInstructions(),
        },
    })

    return RunnableSequence.from([propmpt_template, open_ai_llm, topic_of_interest_parser])
}

export const get_ice_breaker_chain = () => {
    const template = `
         given the information about a person from linkedin {information}, I want you to create:
         2 creative Ice breakers with them that are derived from their activity on Linkedin
        \n{format_instructions}
     `
    const propmpt_template = new PromptTemplate({
        inputVariables: ['information'],
        template: template,
        partialVariables: {
            format_instructions: ice_breaker_parser.getFormatInstructions(),
        },
    })

    return RunnableSequence.from([propmpt_template, open_ai_llm, ice_breaker_parser])
}
