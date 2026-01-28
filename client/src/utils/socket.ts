import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

/**
 * Initializes and returns a singleton Socket.IO client instance.
 * The backend WebSocket URL is read from the environment variable REACT_APP_WS_URL.
 */
export function getSocket(): Socket {
  if (!socket) {
    const wsUrl = process.env.REACT_APP_WS_URL;
    if (!wsUrl) {
      throw new Error('Missing REACT_APP_WS_URL environment variable');
    }
    socket = io(wsUrl, {
      transports: ['websocket'],
    });
  }
  return socket;
}