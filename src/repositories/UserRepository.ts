import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import config from '../config/config';
import { User } from '../domain/User';
import { logger } from '../utils/logger';

/**
 * Repository for fetching user data from a CSV file.
 */
export class UserRepository {
  /**
   * Fetch all users from the CSV file.
   * @returns Promise<User[]>
   * @throws Error if file or parsing error occurs
   */
  async fetchAllUsers(): Promise<User[]> {
    const csvPath = path.resolve(config.userCsvPath);
    try {
      if (!fs.existsSync(csvPath)) {
        logger.error(`[UserRepository] CSV file not found at path: ${csvPath}`);
        throw new Error('User data file not found.');
      }
      const fileContent = fs.readFileSync(csvPath, 'utf-8');
      let records: User[];
      try {
        records = parse(fileContent, {
          columns: true,
          skip_empty_lines: true,
          trim: true,
        });
      } catch (parseError: any) {
        logger.error(`[UserRepository] CSV parse error: ${parseError.message || parseError}`);
        throw new Error('Failed to parse user data file.');
      }
      return records as User[];
    } catch (error: any) {
      logger.error(`[UserRepository] Error reading users from CSV: ${error.message || error}`);
      throw new Error(
        `Failed to fetch users from CSV: ${error.message || error.toString()}`
      );
    }
  }
}

export default new UserRepository();