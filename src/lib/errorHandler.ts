export function actionRunner(fn: (...args: any[]) => Promise<any>) {
    return (...args: any[]) =>
        fn(...args).catch(err => {
            console.error(err)
        })
}
