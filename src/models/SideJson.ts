import _ from 'lodash'
import uuid4 from 'uuid/v4'
import { logger } from '../lib/logger'

export class SideJson {
    data: side.Side

    constructor(data: side.Side) {
        this.data = data
    }

    getTestsName(): string[] {
        const sideTests: side.Test[] = this.data.tests
        return _.map(sideTests, 'name')
    }

    getCommands(name: string): side.Command[] {
        const test = _.find(this.data.tests, { name: name })
        const commands = test!.commands
        if (!commands) {
            logger.error(`test name: ${name}`)
            throw new Error('There is no test content.')
        }
        return commands
    }

    getStoreCommands(name: string): side.Command[] {
        const commands = this.getCommands(name)
        const main = _.find(commands, { comment: 'main' })
        if (!main) {
            logger.error(`test name: ${name}`)
            throw new Error('There is no main comment.')
        }
        return _.chain(commands)
            .takeWhile(command => command.comment !== 'main')
            .filter(command => command.comment !== 'data')
            .value()
    }

    getMainCommands(name: string): side.Command[] {
        const commands = this.getCommands(name)
        const main = _.find(commands, { comment: 'main' })
        if (!main) {
            logger.error(`test name: ${name}`)
            throw new Error('There is no main comment.')
        }
        return _.chain(commands)
            .dropWhile(command => command.comment !== 'main')
            .filter(command => command.comment !== 'main')
            .value()
    }

    // TODO リファクタリング
    replaceId(): side.Side {
        let newData = this.data
        let tests = newData.tests
        let suites = newData.suites
        let ids = new Map()
        newData.id = uuid4()
        tests.map(test => {
            test.commands.map(command => {
                command.id = uuid4()
                return command
            })
            let id = test.id
            let newId = uuid4()
            test.id = newId
            ids.set(id, newId)
            return test
        })
        suites.map(suite => {
            suite.id = uuid4()
            let suiteTests = suite.tests
            suiteTests = suiteTests.map(id => ids.get(id))
            suite.tests = suiteTests
            return suite
        })
        newData.tests = tests
        newData.suites = suites
        return newData
    }
}
