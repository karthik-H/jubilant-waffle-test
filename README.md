# User Data Table Application

This application provides a user-friendly interface to view user information stored in a CSV file, always up-to-date and displayed in a structured table view.

## Features

- View user data from a CSV file in a modern web UI
- Real-time updates: Table view reflects CSV changes instantly (no manual refresh)
- Clean, modular, production-ready codebase (Clean Architecture)
- Environment-based configuration for both backend and frontend

## Folder Structure

- `src/` - Backend (API, WebSocket, CSV reading)
- `client/` - Frontend (React UI)
- `data/` - CSV data files

## Prerequisites

- Node.js (v16+ recommended)
- npm

## Setup

### 1. Clone the repository

```bash
git clone <repo-url>
cd <repo-directory>
```

### 2. Configure Environment Variables

#### Backend

- Copy `.env.example` to `.env` and adjust values as needed.
- Key variables:
  - `USER_CSV_PATH` - Path to the user CSV file (default: `./data/users.csv`)
  - `PORT` - Backend server port (default: 3001)

#### Frontend

- Copy `client/.env.example` to `client/.env` and adjust values if backend runs on a different host/port.

### 3. Install Dependencies

#### Backend

```bash
npm install
```

#### Frontend

```bash
cd client
npm install
```

### 4. Run the Application

#### Start Backend (in project root)

```bash
# For development (with hot reload)
npm run dev

# For production
npm run build
npm start
```

#### Start Frontend (in client/)

```bash
npm start
```

- The frontend will be available at [http://localhost:3000](http://localhost:3000) by default.
- The backend API and WebSocket run on [http://localhost:3001](http://localhost:3001) by default.

## How It Works

- The backend serves user data from the CSV file via `/api/users`.
- The backend watches the CSV file for changes and notifies all connected clients via WebSocket.
- The frontend listens for these notifications and automatically refreshes the table view.

## Configuration

- All environment variables are managed via `.env` and `.env.example` files in both root and `client/`.
- **Do not** add `.env` to `.gitignore` (per requirements).
- Backend CORS origins can be set via `CORS_ORIGIN` in `.env`.
- The CSV file path is set via `USER_CSV_PATH` in `.env`.

## Logging & Error Handling

- Centralized logging and error handling are implemented in the backend.
- The frontend displays user-friendly error messages.

## Production Readiness

- Follows industry-standard folder structure and naming conventions.
- Clean, modular, and testable code.
- All configuration is environment-based.
- No direct access or modification of the CSV file from the UI.
- CORS is production-ready and configurable.
- WebSocket and REST API are secured to only serve data, not allow modification.

## Architecture

- **Backend:** Layered (controller → service → repository), config via `.env`, error handling, logging, CORS, WebSocket for real-time updates.
- **Frontend:** React, environment-based config, modular, connects to backend API and WebSocket, auto-refreshes table on CSV changes.

## License

MIT