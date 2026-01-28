# User Data Backend Service

A production-ready Node.js/TypeScript backend that retrieves user data from backend storage for UI display. The backend decouples the UI from direct file access and ensures the UI always presents the latest user data as stored in the backend, sourced from the JSONPlaceholder API.

## Features

- Clean, layered architecture (controller → service → repository)
- Environment-based configuration
- Robust error handling and logging
- Data population from JSONPlaceholder API
- REST API endpoint for user data retrieval

## Prerequisites

- Node.js (v16+ recommended)
- npm

## Setup

1. **Clone the repository**

   ```bash
   git clone <repo-url>
   cd jubilant-waffle-test
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Copy `.env.example` to `.env` and adjust values as needed:

   ```bash
   cp .env.example .env
   ```

   Key variables:
   - `USERS_API_URL`: Source API for user data (default: https://jsonplaceholder.typicode.com/users)
   - `USERS_STORAGE_PATH`: Path to backend user storage (default: ./data/users.json)
   - `PORT`: Backend server port (default: 3001)
   - `LOG_LEVEL`: Logging level (info, warn, error)

4. **Populate backend storage with user data**

   This fetches the latest users from JSONPlaceholder and stores them in `data/users.json`:

   ```bash
   npx ts-node src/scripts/populateUsers.ts
   ```

   > You can re-run this script anytime to refresh backend storage.

5. **Start the backend server**

   ```bash
   npm start
   ```

   The server will run on `http://localhost:3001` (or your configured port).

## API Usage

### Get All Users

- **Endpoint:** `GET /api/users`
- **Description:** Retrieves all users from backend storage.
- **Response:** Array of user objects

#### Example Response

```json
[
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "address": { /* ... */ },
    "company": { /* ... */ }
  },
  ...
]
```

## Logging

Logging is controlled by the `LOG_LEVEL` environment variable.

## Environment Variables

See `.env.example` for all available configuration options.

## .gitignore

- `node_modules/`
- `*.log`
- `data/users.json` (not ignored, as it is backend storage)
- `.env` (not ignored, per requirements)

## License

MIT