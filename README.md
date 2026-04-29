# Task Management API Server

A TypeScript-based Express.js REST API for managing tasks with PostgreSQL database and Prisma ORM.

## Prerequisites

- **Node.js** (v16+) and **npm**
- **PostgreSQL** database running
- **Git** (optional, for version control)

## Installation Steps

### 1. Install Dependencies

```bash
cd server
npm install
```

**Key Dependencies:**
- **Express.js** - Web framework for building REST API
- **Prisma** - ORM with PostgreSQL adapter
- **TypeScript** - Type-safe development
- **Nodemon** - Auto-reload development server
- **class-validator & class-transformer** - DTO validation
- **dotenv** - Environment variable management

### 2. Environment Configuration

Create a `.env` file in the `server/` directory:

```env
PORT=3000
DATABASE_URL=postgresql://username:password@localhost:5432/task_db
```

**Update these values:**
- `username` - Your PostgreSQL username
- `password` - Your PostgreSQL password
- `localhost:5432` - PostgreSQL host and port (if different)
- `task_db` - Your database name

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run migrations to create database schema
npx prisma migrate deploy

# (Optional) View data in Prisma Studio GUI
npx prisma studio
```

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```
Server will start at `http://localhost:3000`

### Production Mode
```bash
# Build TypeScript to JavaScript
npm run build

# Start the compiled server
npm start
```

## API Endpoints

**Base URL:** `http://localhost:3000/task`

### Available Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/task` | Create a new task |
| `GET` | `/task` | Get all tasks |
| `GET` | `/task/:id` | Get task by ID |
| `DELETE` | `/task/:id` | Delete task by ID |

### Example Requests

**Create Task (POST /task)**
```json
{
  "title": "Complete Project",
  "description": "Finish the assessment project",
  "priority": "high",
  "status": "in_progress",
  "dueDate": "2026-05-01T00:00:00Z"
}
```

**Valid Values:**
- **Status:** `pending`, `in_progress`, `completed`, `cancelled`
- **Priority:** `low`, `medium`, `high`, `urgent`

## Project Structure

```
server/
├── index.ts                 # Main Express app entry point
├── package.json             # Dependencies & npm scripts
├── tsconfig.json            # TypeScript configuration
├── prisma.config.ts         # Prisma database configuration
├── .env                     # Environment variables (create this)
├── dto/                     # Data Transfer Objects
│   ├── createTask.dto.ts
│   ├── updateTask.dto.ts
│   └── index.ts
├── task/                    # Task feature module
│   ├── task.controller.ts   # Route handlers & business logic
│   ├── task.route.ts        # Route definitions
│   └── task.service.ts      # Service layer
├── lib/                     # Utility libraries
│   └── prisma.ts            # Prisma client instance
├── prisma/                  # Database schema & migrations
│   ├── schema.prisma        # Prisma data model
│   └── migrations/          # Migration files
└── generated/               # Generated files (auto-generated)
    └── prisma/              # Prisma client (generated)
```

## npm Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `npm run dev` | Start development server with hot-reload |
| `build` | `npm run build` | Compile TypeScript to JavaScript |
| `start` | `npm start` | Run production server |
| `test` | `npm test` | Run tests (not configured) |

## Database Schema

**Task Model:**
- `id` (UUID) - Unique identifier
- `title` (String) - Task title
- `description` (String) - Task details
- `status` (Enum) - Current status
- `priority` (Enum) - Priority level
- `dueDate` (DateTime, optional) - Task deadline
- `createdAt` (DateTime) - Creation timestamp
- `updatedAt` (DateTime) - Last update timestamp

**Indexes:** Optimized queries on `status` and `priority` fields

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Database connection failed | Verify PostgreSQL is running and `.env` DATABASE_URL is correct |
| Port already in use | Change `PORT` value in `.env` file |
| Prisma client not found | Run `npx prisma generate` |
| Migration errors | Run `npx prisma migrate reset` (development only) |
| Module not found errors | Run `npm install` again |

## Technology Stack

- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js 5.2.1
- **Database:** PostgreSQL
- **ORM:** Prisma 7.8.0
- **Validation:** class-validator, class-transformer
- **Development:** Nodemon, ts-node

## Testing the API

Use **Postman** or **curl** to test endpoints:

```bash
# Create task
curl -X POST http://localhost:3000/task \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Task",
    "description": "Test description",
    "priority": "medium"
  }'

# Get all tasks
curl http://localhost:3000/task

# Get task by ID
curl http://localhost:3000/task/{id}

# Delete task
curl -X DELETE http://localhost:3000/task/{id}
```

## Summary

To run this project:
1. Ensure PostgreSQL is installed and running
2. Clone/extract the repository
3. Navigate to `server/` directory
4. Create `.env` file with `PORT` and `DATABASE_URL`
5. Run `npm install`
6. Run `npx prisma migrate deploy`
7. Run `npm run dev` to start the server
8. Test endpoints using Postman or curl

---
