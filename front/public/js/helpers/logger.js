"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const debug = true;
const verbose = true;
exports.log = {
    debug(...messages) {
        if (debug) {
            console.log('DEBUG', ...messages);
        }
    },
    verbose(...messages) {
        if (verbose) {
            console.log('VERBOSE', ...messages);
        }
    },
    error(message, ...details) {
        console.error('ERROR', message, ...details);
    },
};
