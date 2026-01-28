import userService from '../services/UserService';
import { User } from '../domain/User';

/**
 * Controller for user-related operations.
 * In a real app, this would be an HTTP handler. Here, it's a callable function.
 */
export class UserController {
  /**
   * Fetch and return all users.
   * @returns Promise<User[]>
   */
  async getAllUsers(): Promise<User[]> {
    // In a real web app, error handling would map to HTTP responses
    return await userService.getAllUsers();
  }
}

export default new UserController();