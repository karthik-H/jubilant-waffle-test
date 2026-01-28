import axios, { AxiosInstance } from 'axios';
import config from '../config/config';
import { User } from '../domain/User';

/**
 * Repository for fetching user data from JSONPlaceholder API.
 */
export class UserRepository {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: config.jsonPlaceholderApiBaseUrl,
      timeout: 5000,
    });
  }

  /**
   * Fetch all users from the API.
   * @returns Promise<User[]>
   * @throws Error if network/API error occurs
   */
  async fetchAllUsers(): Promise<User[]> {
    try {
      const response = await this.client.get<User[]>('/users');
      // Validate and return only the required fields
      return response.data.map((user) => ({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        website: user.website,
        address: user.address,
        company: user.company,
      }));
    } catch (error: any) {
      // Rethrow for service layer to handle/log
      throw new Error(
        `Failed to fetch users from API: ${error.message || error.toString()}`
      );
    }
  }
}

export default new UserRepository();