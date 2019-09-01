import fs from 'fs'
import fse from 'fs-extra'
import path from 'path'
import { SideJson } from './SideJson'

export class SideFactory {
    filePath: string

    constructor(filePath: string) {
        this.filePath = filePath
    }

    async factorySideJson(): Promise<SideJson> {
        const sideJson: side.Side = await fse
            .readJson(this.filePath)
            .catch(() => {
                throw new Error('The file could not be read.')
            })
        return new SideJson(sideJson)
    }

    // Perform optional validation
    validate(): void {
        let newFilePath = path.resolve(this.filePath)

        if (path.extname(this.filePath) !== '.side') {
            throw new Error(
                "option: '-f, --file-path <filePath>' invalid argument"
            )
        }
        if (!fs.existsSync(newFilePath) || !fs.statSync(newFilePath).isFile()) {
            throw new Error(
                "option: '-f, --file-path <filePath>' invalid fileType"
            )
        }
        this.filePath = newFilePath
    }
}
