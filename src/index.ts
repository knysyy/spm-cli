import { Command } from 'commander'
const { version, description } = require('../package.json')
import { logger } from './lib/logger'
import CommandParser from './lib/commandParser'
import Extract from './command/extract'
import Assign from './command/assign'
import Replace from './command/replace'

const program: Command = new Command()
const parser = new CommandParser(program)

program.version(version, '-v, --version').description(description)

// Write commands here
// Read .side file, extract data or main and output to json file
parser.use(new Extract())
// Read .json file, assign data to store and output to json file
parser.use(new Assign())
// Read .side file, replace id and output to side file
parser.use(new Replace())

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
