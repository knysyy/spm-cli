import fse from 'fs-extra'
import { StoreJson } from './StoreJson'
import { Builder } from './Builder'
import { logger } from '../lib/logger'

export class StoreJsonBuilder extends Builder {
    extname: string = '.json'

    constructor(filePath: string) {
        super(filePath)
    }

    async build(): Promise<StoreJson> {
        this.validate()
        const storeJson: side.Command[] = await fse
            .readJson(this.filePath)
            .catch(() => {
                throw new Error('The file could not be read.')
            })
        return new StoreJson(storeJson)
    }
}
