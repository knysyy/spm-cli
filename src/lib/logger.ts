import winston from 'winston'

const format = winston.format

export const logger = winston.createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.cli(),
        format.printf(
            info => `[${info.timestamp}] ${info.level} ${info.message}`
        )
    ),
    transports: [new winston.transports.Console()],
})
