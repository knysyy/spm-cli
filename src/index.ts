import { Command } from 'commander'
import Extract from './command/extract'
import CommandParser from './lib/commandParser'

const { version, description } = require('../package.json')

const program: Command = new Command()
const parser = new CommandParser(program)

program.version(version, '-v, --version').description(description)

// commands Here
// Read .side file and extract json
parser.use(new Extract())

program.parse(process.argv)
if (!program.args.length) {
    program.outputHelp()
    process.exit(1)
}
