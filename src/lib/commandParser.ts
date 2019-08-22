import { Command } from 'commander'
import commandInterFace from './commandInterFace'

export default class CommandParser {
    program: Command

    constructor(program: Command) {
        this.program = program
    }

    public use(commandImpl: commandInterFace) {
        commandImpl.use(this.program)
    }
}
