import userRepository from '../repositories/UserRepository';
import { User } from '../domain/User';

/**
 * Service layer for user-related business logic.
 */
export class UserService {
  /**
   * Retrieve all users from the repository.
   * Handles errors and provides a consistent interface.
   * @returns Promise<User[]>
   * @throws Error with descriptive message if retrieval fails
   */
  async getAllUsers(): Promise<User[]> {
    try {
      const users = await userRepository.fetchAllUsers();
      // Additional business logic/validation can be added here if needed
      return users;
    } catch (error: any) {
      // Log error using centralized logger
      const { logger } = await import('../utils/logger');
      logger.error(`[UserService] Error fetching users: ${error.message || error}`);
      throw new Error('Unable to retrieve user data at this time. Please try again later.');
    }
  }
}

export default new UserService();