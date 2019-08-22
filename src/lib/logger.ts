import { createLogger, format, transports, level } from 'winston'
const { combine, timestamp, label, printf, cli } = format

const myFormat = printf(({ level, message }) => {
    return `${level}: ${message.trim()}`
})

export const logger = createLogger({
    level: 'info',
    format: format.combine(timestamp(), cli(), myFormat),
    transports: [new transports.Console()],
})
