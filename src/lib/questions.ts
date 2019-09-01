import { QuestionCollection } from 'inquirer'

export const extractQuestions = (choices: string[]): QuestionCollection => {
    return [
        {
            type: 'list',
            name: 'type',
            message: 'Please select the target to extract.',
            choices: ['data', 'main'],
        },
        {
            type: 'list',
            name: 'name',
            message: 'Please select a test.',
            choices: choices,
        },
    ]
}

export const assignQuestions = (variables: string[]): QuestionCollection => {
    return variables
        .filter(variable => variable)
        .map(variable => {
            return {
                type: 'input',
                name: variable,
                message: "What's your " + variable,
            }
        })
}
