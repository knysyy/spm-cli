import fse from 'fs-extra'
import { Command } from 'commander'
import inquirer, { QuestionCollection } from 'inquirer'
import { logger } from '../lib/logger'
import { actionRunner } from '../lib/errorHandler'
import commandInterFace from '../lib/commandInterFace'
import { SideFactory } from '../models/SideFactory'
import { SideJson } from '../models/SideJson'
import { extractQuestions } from '../lib/questions'

const OUTPUT = 'output.json'

type Args = {
    filePath: string
}

export default class Extract implements commandInterFace {
    public use(program: Command) {
        program
            .command('extract')
            .description(
                'Read .side file, extract data or main and output to json file'
            )
            .option('-f, --file-path <filePath>', '.side file path')
            .action(actionRunner(this.extractJson.bind(this)))
    }

    async extractJson(args: Args): Promise<any> {
        const filePath = args.filePath
        const sideFactory = new SideFactory(filePath)
        sideFactory.validate()

        logger.info(`filePath : ${filePath}`)

        // Reading a file
        const sideJson: SideJson = await sideFactory.factorySideJson()
        const choices = sideJson.getTestsName()

        let questions: QuestionCollection = extractQuestions(choices)

        const answers = await inquirer.prompt(questions)
        logger.info(`answers: ${JSON.stringify(answers)}`)

        const result =
            answers.type === 'data'
                ? sideJson.getStoreCommands(answers.name)
                : sideJson.getMainCommands(answers.name)

        // Writing to file
        await fse.writeJson(OUTPUT, result, { spaces: '    ' }).catch(() => {
            throw new Error('Failed to write file')
        })
        logger.info('Exported to output.json.')
    }
}
