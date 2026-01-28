"use strict";
/**
 * UserController: Entrypoint for user data retrieval.
 * Can be used by CLI, REST API, or other interfaces.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userService_1 = require("../services/userService");
class UserController {
    constructor(userService) {
        this.userService = userService || new userService_1.UserService();
    }
    /**
     * Fetch and display all users.
     * In a real app, this would be an HTTP handler or CLI command.
     */
    async fetchAndDisplayUsers() {
        const { users, error } = await this.userService.getAllUsers();
        if (error) {
            // Log error (logger will be added in utils/logging)
            console.error('Error fetching users:', error);
            return;
        }
        // Pretty-print user data
        console.log('Fetched users:', JSON.stringify(users, null, 2));
    }
}
exports.UserController = UserController;
