import { Command } from 'commander'
import Extract from './command/extract'
import CommandParser from './lib/commandParser'

const { version, description } = require('../package.json')

const program: Command = new Command()
const parser = new CommandParser(program)

program.version(version, '-v, --version').description(description)

// Write commands here
// Read .side file, extract data or main and output to json file
parser.use(new Extract())

program.parse(process.argv)
if (!program.args.length) {
    program.outputHelp()
    process.exit(1)
}
