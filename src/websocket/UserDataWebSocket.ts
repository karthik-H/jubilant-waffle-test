import { Server as HttpServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import fs from 'fs';
import path from 'path';
import config from '../config/config';
import { logger } from '../utils/logger';

let io: SocketIOServer | null = null;
let watcher: fs.FSWatcher | null = null;

/**
 * Initializes the WebSocket server for user data updates.
 * @param httpServer The HTTP server instance to attach to.
 */
export function initUserDataWebSocket(httpServer: HttpServer) {
  io = new SocketIOServer(httpServer, {
    cors: {
      origin: '*', // In production, restrict this to your frontend origin
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    logger.info('[WebSocket] Client connected for user data updates');
    socket.on('disconnect', () => {
      logger.info('[WebSocket] Client disconnected');
    });
  });

  // Watch the CSV file for changes
  const csvPath = path.resolve(config.userCsvPath);
  if (watcher) {
    watcher.close();
  }
  watcher = fs.watch(csvPath, (eventType) => {
    if (eventType === 'change' && io) {
      logger.info('[WebSocket] Detected CSV file change, notifying clients');
      io.emit('userDataUpdated');
    }
  });

  logger.info('[WebSocket] User data WebSocket server initialized');
}

/**
 * Gracefully shuts down the WebSocket server and file watcher.
 */
export function shutdownUserDataWebSocket() {
  if (watcher) {
    watcher.close();
    watcher = null;
  }
  if (io) {
    io.close();
    io = null;
  }
}