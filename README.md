# JSONPlaceholder User Fetcher

A production-ready, clean-architecture Node.js (TypeScript) service to fetch user information from the JSONPlaceholder API.

## Features

- Clean, layered architecture (controller → service → repository → domain)
- Environment-based configuration via `.env`
- Centralized logging and error handling
- Fetches all user records from JSONPlaceholder `/users` endpoint
- Exports all user data (including nested fields) to a properly formatted CSV file
- Modular, testable, and well-documented code

## Folder Structure

```
src/
  config/         # Configuration loader
  controllers/    # Controller/entrypoint
  services/       # Business logic
  repositories/   # API communication
  domain/         # Domain models
  utils/          # Logger, helpers
.env
.env.example
.gitignore
README.md
package.json
tsconfig.json
```

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   - Copy `.env.example` to `.env` and adjust values as needed.

3. **Build and run:**
   ```bash
   npx tsc
   node dist/index.js
   ```
   Or, for development:
   ```bash
   npx ts-node src/index.ts
   ```

4. **Result:**
   - After running, a CSV file will be generated at the path specified by `USER_CSV_OUTPUT_PATH` in your `.env` (default: `output/users.csv`).
   - The CSV will contain all user fields, including nested objects, suitable for spreadsheet applications.

## Configuration

All environment variables are managed in `.env`:

- `JSONPLACEHOLDER_API_BASE_URL` (default: `https://jsonplaceholder.typicode.com`)
- `LOG_LEVEL` (default: `info`)
- `USER_CSV_OUTPUT_PATH` (default: `output/users.csv`)

## Usage

The entrypoint (`src/index.ts`) fetches all users and writes them to a CSV file at the configured location.

#### Example

```bash
npx ts-node src/index.ts
# [INFO] Fetched 10 users. Writing to CSV...
# [INFO] User data written to CSV at: output/users.csv
```

## Error Handling

- Network/API errors are logged and reported without crashing the system.
- All configuration is validated at startup.

## Extending

- Add new services, repositories, or controllers as needed.
- Integrate with a web framework (e.g., Express) for HTTP endpoints.

## License

MIT