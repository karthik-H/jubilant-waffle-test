import userController from './controllers/UserController';
import config from './config/config';
import { logger } from './utils/logger';
import { writeUsersToCsvFile } from './utils/csvWriter';

/**
 * Entrypoint for the application.
 * Fetches all users from JSONPlaceholder and writes them to a CSV file.
 */
async function main() {
  try {
    const users = await userController.getAllUsers();
    logger.info(`Fetched ${users.length} users. Writing to CSV...`);
    await writeUsersToCsvFile(users, config.userCsvOutputPath);
    logger.info(`User data written to CSV at: ${config.userCsvOutputPath}`);
    // Optionally, print a summary
    // console.log('Fetched users:', JSON.stringify(users, null, 2));
  } catch (error: any) {
    logger.error('Error fetching users or writing CSV:', error.message || error);
    process.exit(1);
  }
}

main();