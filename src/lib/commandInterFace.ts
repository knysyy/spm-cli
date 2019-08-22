import { Command } from 'commander'

export default interface CommandInterFace {
    use(program: Command): void
}
