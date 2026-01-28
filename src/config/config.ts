import dotenv from 'dotenv';

dotenv.config();

interface Config {
  jsonPlaceholderApiBaseUrl: string;
  logLevel: string;
}

function getEnvVar(key: string, defaultValue?: string): string {
  const value = process.env[key];
  if (value === undefined || value === '') {
    if (defaultValue !== undefined) return defaultValue;
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

const config: Config = {
  jsonPlaceholderApiBaseUrl: getEnvVar('JSONPLACEHOLDER_API_BASE_URL'),
  logLevel: getEnvVar('LOG_LEVEL', 'info'),
};

export default config;