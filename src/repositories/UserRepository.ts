import fs from 'fs';
import path from 'path';
import config from '../config/config';
import { User } from '../domain/User';
import { logger } from '../utils/logger';

/**
 * Repository for fetching user data from backend storage (JSON file).
 */
export class UserRepository {
  /**
   * Fetch all users from the backend storage JSON file.
   * @returns Promise<User[]>
   * @throws Error if file or parsing error occurs
   */
  async fetchAllUsers(): Promise<User[]> {
    const jsonPath = path.resolve(config.usersStoragePath);
    try {
      if (!fs.existsSync(jsonPath)) {
        logger.error(`[UserRepository] User storage file not found at path: ${jsonPath}`);
        throw new Error('User data file not found.');
      }
      const fileContent = fs.readFileSync(jsonPath, 'utf-8');
      let users: User[];
      try {
        users = JSON.parse(fileContent);
        if (!Array.isArray(users)) {
          throw new Error('User data is not an array');
        }
      } catch (parseError: any) {
        logger.error(`[UserRepository] JSON parse error: ${parseError.message || parseError}`);
        throw new Error('Failed to parse user data file.');
      }
      return users as User[];
    } catch (error: any) {
      logger.error(`[UserRepository] Error reading users from storage: ${error.message || error}`);
      throw new Error(
        `Failed to fetch users from storage: ${error.message || error.toString()}`
      );
    }
  }
}

export default new UserRepository();