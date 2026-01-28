import userController from './controllers/UserController';

/**
 * Entrypoint for the application.
 * Fetches and prints all users from JSONPlaceholder.
 */
async function main() {
  try {
    const users = await userController.getAllUsers();
    console.log('Fetched users:', JSON.stringify(users, null, 2));
  } catch (error: any) {
    console.error('Error fetching users:', error.message || error);
    process.exit(1);
  }
}

main();