import { Command } from 'commander'
import CommandParser from './lib/commandParser'
import Extract from './command/extract'
import Assign from './command/assign'
import { logger } from './lib/logger'
const { version, description } = require('../package.json')
const program: Command = new Command()
const parser = new CommandParser(program)

program.version(version, '-v, --version').description(description)

// Write commands here
// Read .side file, extract data or main and output to json file
parser.use(new Extract())
// Read .json file, assign data to store and output to json file
parser.use(new Assign())

// There is no command entered
program.on('command:*', () => {
    logger.error('There is no such command')
    program.outputHelp()
    process.exit(1)
})

program.parse(process.argv)

if (!program.args.length) {
    program.outputHelp()
    process.exit(1)
}
