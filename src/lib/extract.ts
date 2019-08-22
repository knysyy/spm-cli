import { Command } from 'commander'
import { actionRunner } from './errorHandler'
import commandInterFace from './commandInterFace'

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
