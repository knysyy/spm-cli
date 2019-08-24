import commandInterFace from '../lib/commandInterFace'
import { Command } from 'commander'
import { actionRunner } from '../lib/errorHandler'

const OUTPUT = 'output.json'

type Args = {
    filePath: string
}

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

    async assignData(args: Args): Promise<any> {}
}
