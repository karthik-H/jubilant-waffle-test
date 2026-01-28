import userController from './controllers/UserController';
import config from './config/config';
import { writeObjectsToCsv } from './utils/csvWriter';
import { logger } from './utils/logger';

/**
 * Entrypoint for the application.
 * Fetches all users from JSONPlaceholder and writes them to a CSV file.
 */
async function main() {
  try {
    const users = await userController.getAllUsers();
    logger.info(`Fetched ${users.length} users. Writing to CSV...`);
    await writeObjectsToCsv(users, config.csvOutputPath);
    logger.info(`User data successfully written to CSV at: ${config.csvOutputPath}`);
    // Optionally, print a summary
    console.log(`CSV file created at: ${config.csvOutputPath}`);
  } catch (error: any) {
    logger.error('Error fetching users or writing CSV: ' + (error.message || error));
    console.error('Error fetching users or writing CSV:', error.message || error);
    process.exit(1);
  }
}

main();