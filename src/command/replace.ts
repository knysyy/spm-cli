import fs from 'fs'
import jsBeautify from 'js-beautify'
import commandInterFace from '../lib/commandInterFace'
import { Command } from 'commander'
import { actionRunner } from '../lib/errorHandler'
import { SideJsonBuilder } from '../models/SideJsonBuilder'
import { SideJson } from '../models/SideJson'
import { logger } from '../lib/logger'
import { promisify } from 'util'

const OUTPUT = 'output.side'

export default class Replace implements commandInterFace {
    public use(program: Command) {
        program
            .command('replace')
            .description(
                'Read .side file, replace id and output to new side file'
            )
            .option('-f, --file-path <filePath>', '.side file path')
            .action(actionRunner(this.replaceId.bind(this)))
    }

    async replaceId(args: arg.DefaultArgs): Promise<any> {
        const filePath = args.filePath
        const sideJsonBuilder = new SideJsonBuilder(filePath)
        // Reading a file
        const sideJson: SideJson = await sideJsonBuilder.build()
        const result = sideJson.replaceId()

        await promisify(fs.writeFile)(
            OUTPUT,
            jsBeautify(JSON.stringify(result), { indent_size: 2 }),
            { encoding: 'utf-8' }
        ).catch(() => {
            throw new Error('Failed to write file')
        })
        logger.info(`Exported to ${OUTPUT}.`)
    }
}
