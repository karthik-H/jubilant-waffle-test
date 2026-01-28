"use strict";
/**
 * Configuration loader using dotenv and process.env.
 * All environment variables must be defined in .env or the environment.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    JSONPLACEHOLDER_BASE_URL: process.env.JSONPLACEHOLDER_BASE_URL || '',
    LOG_LEVEL: process.env.LOG_LEVEL || 'info',
};
if (!exports.config.JSONPLACEHOLDER_BASE_URL) {
    throw new Error('Missing required environment variable: JSONPLACEHOLDER_BASE_URL');
}
