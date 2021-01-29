const debug = true
const verbose = true

export const log = {
    debug(...messages: any[]) {
        if (debug) {
            // tslint:disable-next-line:no-console
            console.log('DEBUG', ...messages)
        }
    },

    verbose(...messages: any[]) {
        if (verbose) {
            // tslint:disable-next-line:no-console
            console.log('VERBOSE', ...messages)
        }
    },

    error(message: any, ...details: any[]) {
        // tslint:disable-next-line:no-console
        console.error('ERROR', message, ...details)
    },
}
