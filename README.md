# User Data Table Application

A production-ready, full-stack application to view user information stored in a CSV file via a user-friendly web interface.  
Implements clean architecture, robust error handling, and strict configuration management.

---

## Features

- Reads user information from a CSV file (`data/users.csv`)
- Presents all fields in a clear, accessible table view (React frontend)
- Table view always reflects the current CSV contents (auto-refresh)
- Backend API (Node.js/TypeScript, Express) serves CSV data securely
- Strict separation of concerns (controller → service → repository)
- All configuration via `.env` files (never hardcoded)
- Robust error handling and logging
- Industry-standard folder structure and naming conventions

---

## Architecture

```
project-root/
├── client/                # React frontend (TypeScript)
├── data/                  # CSV data storage
│   └── users.csv
├── src/                   # Backend source code (Node.js, TypeScript)
│   ├── config/
│   ├── controllers/
│   ├── domain/
│   ├── repositories/
│   ├── services/
│   └── utils/
├── .env
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## Prerequisites

- Node.js (v18+ recommended)
- npm (v9+ recommended)

---

## Setup & Run Instructions

### 1. Clone the repository

```bash
git clone <repo-url>
cd <repo-directory>
```

### 2. Install backend dependencies

```bash
npm install
```

### 3. Configure environment variables

- Copy `.env.example` to `.env` and adjust as needed.
- Ensure `USER_CSV_PATH=./data/users.csv` is set.

### 4. Prepare the CSV file

- The default CSV is at `data/users.csv`.
- Update this file to change the data shown in the UI.
- All columns in the CSV will be displayed.

### 5. Build and start the backend server

```bash
npm run build
npm start
```

- The backend will run on [http://localhost:3001](http://localhost:3001) by default.

### 6. Start the frontend (React app)

```bash
cd client
npm install
npm start
```

- The frontend will run on [http://localhost:3000](http://localhost:3000) by default.
- It will proxy API requests to the backend.

---

## Usage

- Open [http://localhost:3000](http://localhost:3000) in your browser.
- The table will display all user data from the CSV file.
- The table auto-refreshes every 5 seconds to reflect any CSV changes.
- To update the data, edit `data/users.csv` and save. The UI will update automatically.

---

## Configuration

All environment variables are managed in `.env`:

- `USER_CSV_PATH` — Path to the user CSV file (default: `./data/users.csv`)
- `PORT` — Backend server port (default: `3001`)
- See `.env.example` for all options.

**Never hardcode secrets or environment-specific values.**

---

## Error Handling & Logging

- All errors (file not found, parse errors, etc.) are logged via the centralized logger.
- The UI displays clear error messages if data cannot be loaded.

---

## Folder Structure

- `src/` — Backend code (clean architecture: controller → service → repository)
- `client/` — React frontend (table view, polling, error handling)
- `data/` — CSV data file

---

## Contribution

- Follow official style guides and linting standards.
- All code must be modular, testable, and well-documented.
- Do not commit `.env` files with secrets.

---

## License

MIT
