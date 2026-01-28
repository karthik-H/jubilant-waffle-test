"use strict";
/**
 * Simple logger utility.
 * In production, replace with a robust logger (e.g., Winston, Pino).
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const LOG_LEVELS = ['debug', 'info', 'warn', 'error'];
const currentLevel = process.env.LOG_LEVEL || 'info';
function shouldLog(level) {
    return LOG_LEVELS.indexOf(level) >= LOG_LEVELS.indexOf(currentLevel);
}
exports.logger = {
    debug: (...args) => shouldLog('debug') && console.debug('[DEBUG]', ...args),
    info: (...args) => shouldLog('info') && console.info('[INFO]', ...args),
    warn: (...args) => shouldLog('warn') && console.warn('[WARN]', ...args),
    error: (...args) => shouldLog('error') && console.error('[ERROR]', ...args),
};
