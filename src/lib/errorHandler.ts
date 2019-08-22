import { logger } from './logger'

export function actionRunner(fn: (...args: any[]) => Promise<any>) {
    return (...args: any[]) =>
        fn(...args).catch(err => {
            logger.error(err)
        })
}
