"use strict";
/**
 * UserService: Business logic for user data retrieval.
 * Handles error propagation and prepares data for controllers.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const userRepository_1 = require("../repositories/userRepository");
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository || new userRepository_1.UserRepository();
    }
    /**
     * Retrieve all users, handling errors gracefully.
     * @returns Promise<{ users: User[]; error?: string }>
     */
    async getAllUsers() {
        try {
            const users = await this.userRepository.fetchAllUsers();
            return { users };
        }
        catch (error) {
            // Log error (logger will be added in utils/logging)
            return { users: [], error: error.message || 'Unknown error' };
        }
    }
}
exports.UserService = UserService;
