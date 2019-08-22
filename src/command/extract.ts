import fs from 'fs'
import path from 'path'
import { Command } from 'commander'
import { actionRunner } from '../lib/errorHandler'
import commandInterFace from '../lib/commandInterFace'
import { logger } from '../lib/logger'
import inquirer from 'inquirer'
import { promisify } from 'util'

type Args = {
    filePath: string
}

export default class Extract implements commandInterFace {
    // .side file path
    private filePath: string = ''

    public use(program: Command) {
        program
            .command('extract')
            .description('extract data or main from .side')
            .option('-f, --file-path <filePath>', '.side File to Extract')
            .action(actionRunner(this.extractJson.bind(this)))
    }

    async extractJson(args: Args): Promise<any> {
        this.filePath = args.filePath
        this.validate()

        logger.info(`filePath : ${this.filePath}`)

        const buf = await promisify(fs.readFile)(this.filePath, {
            encoding: 'utf-8',
        }).catch(() => {
            throw new Error('The file could not be read.')
        })

        const side: side.Side = JSON.parse(buf)
        let choices: string[] = []

        side.tests.forEach(elem => {
            choices.push(elem.name)
        })

        let questions = [
            {
                type: 'list',
                name: 'type',
                message: 'Please select the target to extract.',
                choices: ['data', 'main'],
            },
            {
                type: 'list',
                name: 'test',
                message: 'Please select a test.',
                choices: choices,
            },
        ]

        inquirer.prompt(questions).then(answers => {
            logger.info(`answers: ${JSON.stringify(answers)}`)
        })
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
