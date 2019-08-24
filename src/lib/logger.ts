import { createLogger, format, transports } from 'winston'
const { combine, timestamp, printf, cli } = format

// Specifying the format
const myFormat = printf(({ level, message }) => {
    return `${level}: ${message.trim()}`
})

export const logger = createLogger({
    level: 'info',
    format: combine(timestamp(), cli(), myFormat),
    transports: [new transports.Console()],
})
