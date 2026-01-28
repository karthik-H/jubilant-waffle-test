/**
 * UserController: Entrypoint for user data retrieval.
 * Can be used by CLI, REST API, or other interfaces.
 */

import { UserService } from '../services/userService';

export class UserController {
  private readonly userService: UserService;

  constructor(userService?: UserService) {
    this.userService = userService || new UserService();
  }

  /**
   * Fetch and display all users.
   * In a real app, this would be an HTTP handler or CLI command.
   */
  async fetchAndDisplayUsers(): Promise<void> {
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