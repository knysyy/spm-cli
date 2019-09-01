import _ from 'lodash'
import uuid4 from 'uuid/v4'

export class StoreJson {
    data: side.Command[]

    constructor(data: side.Command[]) {
        this.data = data
    }

    getVariableName(): string[] {
        const variables = _.chain(this.data)
            .filter({ command: 'store' })
            .filter('value')
            .map('value')
            .value()
        if (variables.length == 0) {
            throw new Error('There is no store command')
        }
        return variables
    }

    assignVariable(variables: { [s: string]: string }): side.Command[] {
        return _.chain(this.data)
            .map(command => {
                if (command.command === 'store' && command.value) {
                    return Object.assign(command, {
                        id: uuid4(),
                        target: variables[command.value],
                    })
                }
                return Object.assign(command, {
                    id: uuid4(),
                })
            })
            .value()
    }
}
