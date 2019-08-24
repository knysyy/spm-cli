import fs from 'fs'
import fse from 'fs-extra'
import path from 'path'
import { Command } from 'commander'
import { actionRunner } from '../lib/errorHandler'
import commandInterFace from '../lib/commandInterFace'
import { logger } from '../lib/logger'
import inquirer, { QuestionCollection } from 'inquirer'
import _ from 'lodash'

const OUTPUT = 'output.json'

type Args = {
    filePath: string
}

export default class Extract implements commandInterFace {
    // .side file path
    private filePath: string = ''

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
        this.filePath = args.filePath
        this.validate()

        logger.info(`filePath : ${this.filePath}`)

        // Reading a file
        const sideJson: side.Side = await fse
            .readJson(this.filePath)
            .catch(() => {
                throw new Error('The file could not be read.')
            })

        const sideTests: side.Test[] = sideJson.tests
        const choices = _.map(sideTests, 'name')

        let questions: QuestionCollection = [
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

        const answers = await inquirer.prompt(questions)
        logger.info(`answers: ${JSON.stringify(answers)}`)

        const test = sideTests.find(test => test.name === answers.name)
        const commands = test!.commands

        if (!commands) {
            logger.error(`test name: ${answers.name}`)
            throw new Error('There is no test content.')
        }

        const result =
            answers.type === 'data'
                ? _.chain(commands)
                      .takeWhile(command => command.comment !== 'main')
                      .filter(command => command.comment !== 'data')
                      .value()
                : _.chain(commands)
                      .dropWhile(command => command.comment !== 'main')
                      .filter(command => command.comment !== 'main')
                      .value()

        // Writing to file
        await fse.writeJson(OUTPUT, result, { spaces: '    ' }).catch(() => {
            throw new Error('Failed to write file')
        })
        logger.info('Exported to output.json.')
    }

    // Perform optional validation
    private validate(): void {
        let newFilePath = path.resolve(this.filePath)

        if (path.extname(this.filePath) !== '.side') {
            throw new Error(
                "option: '-f, --file-path <filePath>' invalid argument"
            )
        }
        if (!fs.existsSync(newFilePath) || !fs.statSync(newFilePath).isFile()) {
            throw new Error(
                "option: '-f, --file-path <filePath>' invalid fileType"
            )
        }
        this.filePath = newFilePath
    }
}
