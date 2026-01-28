import express, { Request, Response } from 'express';
import userController from './controllers/UserController';
import { logger } from './utils/logger';

const app = express();
const PORT = process.env.PORT || 3001;

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// Users API endpoint
app.get('/api/users', async (_req: Request, res: Response) => {
  try {
    const users = await userController.getAllUsers();
    res.json(users);
  } catch (error: any) {
    logger.error(`[API] Failed to fetch users: ${error.message || error}`);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Start server
app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});