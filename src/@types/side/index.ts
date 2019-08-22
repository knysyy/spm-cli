namespace side {
    export declare type Side = {
        id: string
        version: string
        name: string
        url: string
        tests: Test[]
        suites: Suite[]
        urls: string[]
        plugins: string[]
    }

    export declare type Test = {
        id: string
        name: string
        commands: Command[]
    }

    export declare type Command = {
        id: string
        comment: string
        command: string
        target: string
        targets: [string[]]
        value: string
    }

    export declare type Suite = {
        id: string
        name: string
        persistSession: boolean
        parallel: boolean
        timeout: number
        tests: string[]
    }
}
