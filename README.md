# User Data Fetcher & CSV Exporter

This Node.js application fetches user data from the JSONPlaceholder API and exports all user fields (including nested objects) to a properly formatted CSV file.

## Features

- Fetches all user fields from the JSONPlaceholder `/users` endpoint
- Stores all fields, including nested objects, in a CSV file
- Clean, modular, and production-ready codebase
- Environment-based configuration
- Logging and error handling

## Folder Structure

```
src/
  config/         # Configuration and environment management
  controllers/    # Application controllers
  domain/         # Domain models
  repositories/   # Data access layer
  services/       # Business logic
  utils/          # Utilities (CSV writer, logger, etc.)
```

## Prerequisites

- Node.js (v16+ recommended)
- npm

## Setup

1. **Clone the repository**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   - Copy `.env.example` to `.env` and adjust values if needed:
     ```bash
     cp .env.example .env
     ```

   - By default, the following variables are required:
     - `API_URL` - Base URL for the JSONPlaceholder API (default: `https://jsonplaceholder.typicode.com`)
     - `CSV_OUTPUT_PATH` - Output path for the generated CSV file (default: `output/users.csv`)

4. **Run the application**
   ```bash
   npm start
   ```

   The CSV file will be generated at the path specified in your `.env` file.

## Output

- The CSV file will contain all user fields as returned by the API, including nested objects (address, company) as JSON strings.
- The file can be opened in any standard spreadsheet application.

## Logging

- Logs are printed to the console.
- Log level can be set via the `LOG_LEVEL` environment variable (default: `info`).

## Project Standards

- Follows clean architecture and industry-standard folder structure
- All configuration is managed via `.env` files
- No hardcoded values
- Fully documented, modular, and testable code

## License

MIT