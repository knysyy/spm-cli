import fse from 'fs-extra'
import { SideJson } from './SideJson'
import { Builder } from './Builder'

export class SideJsonBuilder extends Builder {
    extname: string = '.side'

    constructor(filePath: string) {
        super(filePath)
    }

    async build(): Promise<SideJson> {
        this.validate()
        const sideJson: side.Side = await fse
            .readJson(this.filePath)
            .catch(() => {
                throw new Error('The file could not be read.')
            })
        return new SideJson(sideJson)
    }
}
