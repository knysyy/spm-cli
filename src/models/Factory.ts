import * as path from 'path'
import * as fs from 'fs'
import { logger } from '../lib/logger'

export abstract class Factory {
    filePath: string
    abstract extname: string

    protected constructor(filePath: string) {
        this.filePath = filePath
    }

    // Perform optional validation
    protected validate(): void {
        let newFilePath = path.resolve(this.filePath)

        if (path.extname(this.filePath) !== this.extname) {
            throw new Error(
                "option: '-f, --file-path <filePath>' invalid argument"
            )
        }
        if (!fs.existsSync(newFilePath) || !fs.statSync(newFilePath).isFile()) {
            throw new Error(
                "option: '-f, --file-path <filePath>' invalid fileType"
            )
        }
        logger.info(`filePath: ${this.filePath}`)
        this.filePath = newFilePath
    }
}
