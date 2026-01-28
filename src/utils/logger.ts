import config from '../config/config';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

function getLogLevel(): LogLevel {
  const level = config.logLevel.toLowerCase();
  if (['debug', 'info', 'warn', 'error'].includes(level)) {
    return level as LogLevel;
  }
  return 'info';
}

const currentLevel = LOG_LEVELS[getLogLevel()];

export const logger = {
  debug: (...args: any[]) => {
    if (currentLevel <= LOG_LEVELS.debug) {
      console.debug('[DEBUG]', ...args);
    }
  },
  info: (...args: any[]) => {
    if (currentLevel <= LOG_LEVELS.info) {
      console.info('[INFO]', ...args);
    }
  },
  warn: (...args: any[]) => {
    if (currentLevel <= LOG_LEVELS.warn) {
      console.warn('[WARN]', ...args);
    }
  },
  error: (...args: any[]) => {
    if (currentLevel <= LOG_LEVELS.error) {
      console.error('[ERROR]', ...args);
    }
  },
};