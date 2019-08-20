import { Command } from 'commander'

const { version, description } = require('../package.json')

const program: Command = new Command()

program.version(version, '-v, --version').description(description)

// Read json file ant replace id with new one
program.command('replace').action(() => {
    console.log('replace called')
})

// Read .side file and extract json
program
    .command('extract')
    .option('-f, --file-path <filePath>', 'File to Extract')
    .action(() => {
        console.log('extract called')
    })

program.parse(process.argv)

if (!program.args.length) {
    program.outputHelp()
    process.exit(1)
}

function actionRunner(fn: (...args: any) => Promise<any>) {
    return (...args: any) =>
        fn(...args).catch(err => {
            console.error(err)
        })
}
