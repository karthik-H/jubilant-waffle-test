/**
 * UserService: Business logic for user data retrieval.
 * Handles error propagation and prepares data for controllers.
 */

import { UserRepository } from '../repositories/userRepository';
import { User } from '../domain/user';

export class UserService {
  private readonly userRepository: UserRepository;

  constructor(userRepository?: UserRepository) {
    this.userRepository = userRepository || new UserRepository();
  }

  /**
   * Retrieve all users, handling errors gracefully.
   * @returns Promise<{ users: User[]; error?: string }>
   */
  async getAllUsers(): Promise<{ users: User[]; error?: string }> {
    try {
      const users = await this.userRepository.fetchAllUsers();
      return { users };
    } catch (error: any) {
      // Log error (logger will be added in utils/logging)
      return { users: [], error: error.message || 'Unknown error' };
    }
  }
}