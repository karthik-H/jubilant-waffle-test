/**
 * Configuration loader using dotenv and process.env.
 * All environment variables must be defined in .env or the environment.
 */

import dotenv from 'dotenv';

dotenv.config();

export const config = {
  JSONPLACEHOLDER_BASE_URL: process.env.JSONPLACEHOLDER_BASE_URL || '',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
};

if (!config.JSONPLACEHOLDER_BASE_URL) {
  throw new Error('Missing required environment variable: JSONPLACEHOLDER_BASE_URL');
}