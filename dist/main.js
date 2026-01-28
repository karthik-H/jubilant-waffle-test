"use strict";
/**
 * Application entrypoint.
 * Loads config, initializes controller, and triggers user fetch.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("./controllers/userController");
const logger_1 = require("./utils/logger");
async function main() {
    logger_1.logger.info('Starting user fetch from JSONPlaceholder API...');
    const controller = new userController_1.UserController();
    await controller.fetchAndDisplayUsers();
}
main().catch((err) => {
    // Top-level error handler
    logger_1.logger.error('Fatal error:', err);
    process.exit(1);
});
