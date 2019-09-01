import commandInterFace from '../lib/commandInterFace'
import { Command } from 'commander'
import { actionRunner } from '../lib/errorHandler'
import { StoreJsonFactory } from '../models/StoreJsonFactory'
import { StoreJson } from '../models/StoreJson'
import { logger } from '../lib/logger'
import { QuestionCollection } from 'inquirer'
import { assignQuestions } from '../lib/questions'
import * as inquirer from 'inquirer'

const OUTPUT = 'output.json'

export default class Assign implements commandInterFace {
    // .json file path
    private filePath: string = ''

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
        const storeJsonFactory = new StoreJsonFactory(filePath)
        // Reading a file
        const storeJson: StoreJson = await storeJsonFactory.factoryStoreJson()
        const variables = storeJson.getVariableName()
        const questions: QuestionCollection = assignQuestions(variables)
        const answers = await inquirer.prompt(questions)
        logger.info(`answers: ${JSON.stringify(answers)}`)
    }
}
