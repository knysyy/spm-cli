import { logger } from './logger'

// Catch command error and output log
export function actionRunner(fn: (...args: any[]) => Promise<any>) {
    return (...args: any[]) =>
        fn(...args).catch(err => {
            logger.error(err)
        })
}
