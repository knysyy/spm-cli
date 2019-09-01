import fse from 'fs-extra'
import { SideJson } from './SideJson'
import { Factory } from './Factory'

export class SideFactory extends Factory {
    extname: string = '.side'

    constructor(filePath: string) {
        super(filePath)
    }

    async factorySideJson(): Promise<SideJson> {
        this.validate()
        const sideJson: side.Side = await fse
            .readJson(this.filePath)
            .catch(() => {
                throw new Error('The file could not be read.')
            })
        return new SideJson(sideJson)
    }
}
