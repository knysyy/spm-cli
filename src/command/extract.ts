import { Command } from 'commander'
import { actionRunner } from '../lib/errorHandler'
import commandInterFace from '../lib/commandInterFace'

type Args = {
    filePath: string
}

export default class Extract implements commandInterFace {
    public use(program: Command) {
        program
            .command('extract')
            .option('-f, --file-path <filePath>', 'File to Extract')
            .action(actionRunner(this.extractJson))
    }

    async extractJson(args: Args): Promise<any> {
        console.log(args)
    }
}
