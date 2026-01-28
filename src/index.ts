import express, { Request, Response } from 'express';
import userController from './controllers/UserController';
import { logger } from './utils/logger';
import http from 'http';
import { initUserDataWebSocket, shutdownUserDataWebSocket } from './websocket/UserDataWebSocket';

import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration (production-ready)
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',')
  : ['http://localhost:3000', 'http://localhost:3001'];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

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

// Create HTTP server and attach WebSocket
const server = http.createServer(app);
initUserDataWebSocket(server);

server.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  logger.info('Received SIGINT, shutting down...');
  shutdownUserDataWebSocket();
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});
process.on('SIGTERM', () => {
  logger.info('Received SIGTERM, shutting down...');
  shutdownUserDataWebSocket();
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});