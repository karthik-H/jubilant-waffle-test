/**
 * Application entrypoint.
 * Loads config, initializes controller, and triggers user fetch.
 */

import { UserController } from './controllers/userController';
import { logger } from './utils/logger';

async function main() {
  logger.info('Starting user fetch from JSONPlaceholder API...');
  const controller = new UserController();
  await controller.fetchAndDisplayUsers();
}

main().catch((err) => {
  // Top-level error handler
  logger.error('Fatal error:', err);
  process.exit(1);
});