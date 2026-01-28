import dotenv from 'dotenv';

dotenv.config();

interface Config {
  jsonPlaceholderApiBaseUrl: string;
  logLevel: string;
  csvOutputPath: string;
  userCsvPath: string;
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
  jsonPlaceholderApiBaseUrl: getEnvVar('API_URL'),
  logLevel: getEnvVar('LOG_LEVEL', 'info'),
  csvOutputPath: getEnvVar('CSV_OUTPUT_PATH'),
  userCsvPath: getEnvVar('USER_CSV_PATH'),
};

export default config;