import fse from 'fs-extra'
import { Command } from 'commander'
import inquirer, { QuestionCollection } from 'inquirer'
import commandInterFace from '../lib/commandInterFace'
import { actionRunner } from '../lib/errorHandler'
import { StoreJsonBuilder } from '../models/StoreJsonBuilder'
import { StoreJson } from '../models/StoreJson'
import { logger } from '../lib/logger'
import { assignQuestions } from '../lib/questions'

const OUTPUT = 'output.json'

export default class Assign implements commandInterFace {
    public use(program: Command) {
        program
            .command('assign')
            .description(
                'Read .json file, assign data to store and output to json file'
            )
            .option('-f, --file-path <filePath>', '.json file path')
            .action(actionRunner(this.assignData.bind(this)))
    }

    async assignData(args: arg.DefaultArgs): Promise<any> {
        const filePath = args.filePath
        const storeJsonFactory = new StoreJsonBuilder(filePath)
        // Reading a file
        const storeJson: StoreJson = await storeJsonFactory.build()

        const variables = storeJson.getVariableName()
        const questions: QuestionCollection = assignQuestions(variables)
        const answers = await inquirer.prompt(questions)
        logger.info(`answers: ${JSON.stringify(answers)}`)

        const result: side.Command[] = storeJson.assignVariable(answers)

        // writing to file
        await fse.writeJson(OUTPUT, result, { spaces: '    ' }).catch(() => {
            throw new Error('Failed to write file')
        })
        logger.info('Exported to output.json')
    }
}
