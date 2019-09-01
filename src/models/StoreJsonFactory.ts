import fse from 'fs-extra'
import { StoreJson } from './StoreJson'
import { Factory } from './Factory'
import { logger } from '../lib/logger'

export class StoreJsonFactory extends Factory {
    extname: string = '.json'

    constructor(filePath: string) {
        super(filePath)
    }

    async factoryStoreJson(): Promise<StoreJson> {
        this.validate()
        const storeJson: side.Command[] = await fse
            .readJson(this.filePath)
            .catch(() => {
                throw new Error('The file could not be read.')
            })
        return new StoreJson(storeJson)
    }
}
