"use strict";
/**
 * UserRepository: Handles data retrieval from the JSONPlaceholder API.
 * Implements error handling and returns domain models.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config");
class UserRepository {
    constructor() {
        this.baseUrl = config_1.config.JSONPLACEHOLDER_BASE_URL;
    }
    /**
     * Fetch all users from the JSONPlaceholder API.
     * @returns Promise<User[]>
     * @throws Error if network/API error occurs
     */
    async fetchAllUsers() {
        try {
            const response = await axios_1.default.get(`${this.baseUrl}/users`, {
                timeout: 5000,
                validateStatus: (status) => status >= 200 && status < 300,
            });
            return response.data;
        }
        catch (error) {
            // Log error and rethrow for service layer to handle
            // (Logger will be added in utils/logging)
            throw new Error(`Failed to fetch users from JSONPlaceholder API: ${error.message || error}`);
        }
    }
}
exports.UserRepository = UserRepository;
