/**
 * UserRepository: Handles data retrieval from the JSONPlaceholder API.
 * Implements error handling and returns domain models.
 */

import axios from 'axios';
import { config } from '../config';
import { User } from '../domain/user';

export class UserRepository {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = config.JSONPLACEHOLDER_BASE_URL;
  }

  /**
   * Fetch all users from the JSONPlaceholder API.
   * @returns Promise<User[]>
   * @throws Error if network/API error occurs
   */
  async fetchAllUsers(): Promise<User[]> {
    try {
      const response = await axios.get<User[]>(`${this.baseUrl}/users`, {
        timeout: 5000,
        validateStatus: (status) => status >= 200 && status < 300,
      });
      return response.data;
    } catch (error: any) {
      // Log error and rethrow for service layer to handle
      // (Logger will be added in utils/logging)
      throw new Error(
        `Failed to fetch users from JSONPlaceholder API: ${error.message || error}`
      );
    }
  }
}