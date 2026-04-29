# Task Management API Server

A TypeScript-based Express.js REST API for managing tasks with PostgreSQL database and Prisma ORM.

## Prerequisites

- **Node.js** (v16+) and **npm**
- **PostgreSQL** database running
- **Groq API Key** (free at https://console.groq.com) - required for AI text-to-task feature
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
GROQ_API_KEY=your_groq_api_key_here
```

**Update these values:**
- `username` - Your PostgreSQL username
- `password` - Your PostgreSQL password
- `localhost:5432` - PostgreSQL host and port (if different)
- `task_db` - Your database name
- `GROQ_API_KEY` - Get from https://console.groq.com (free tier available)

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
| `GET` | `/health` | Health check - verify API is running |
| `POST` | `/create` | Create a new task with structured data |
| `POST` | `/create-from-text` | Create task from natural language text (AI-powered) |
| `PATCH` | `/:id` | Update task status by ID |

### Example Requests

**1. Health Check (GET /health)**
```bash
curl http://localhost:3000/task/health
```

**Response:**
```json
{
  "status": "Ok"
}
```

**2. Create Task with Structured Data (POST /create)**
```bash
curl -X POST http://localhost:3000/task/create \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete Project",
    "description": "Finish the assessment project",
    "priority": "high",
    "status": "pending",
    "dueDate": "2026-05-01T00:00:00Z"
  }'
```

**Required Fields:**
- `title` (string, min 3 chars) - Task title
- `priority` (enum) - Priority level

**Optional Fields:**
- `description` (string) - Task description
- `status` (enum) - Task status (defaults to pending)
- `dueDate` (ISO-8601 datetime) - Task deadline

**3. Create Task from Natural Language (POST /create-from-text)**

AI-powered endpoint that converts natural language to structured task.

```bash
curl -X POST http://localhost:3000/task/create-from-text \
  -H "Content-Type: application/json" \
  -d '{
    "text": "I need to complete the project report by Friday with high priority"
  }'
```

**Input:**
- `text` (string) - Natural language task description

**Response:** Automatically parsed into task with title, description, priority, and dueDate.

**4. Update Task Status (PATCH /:id)**
```bash
curl -X PATCH http://localhost:3000/task/{taskId} \
  -H "Content-Type: application/json" \
  -d '{
    "status": "in_progress"
  }'
```

**Update Request Body:**
- `status` (enum) - New status value

### Valid Enum Values

**Status:**
- `pending`
- `in_progress`
- `completed`
- `cancelled`

**Priority:**
- `low`
- `medium`
- `high`
- `urgent`

## Key Features

- **REST API** - Full CRUD operations for task management
- **AI-Powered Text Parsing** - Convert natural language to structured tasks using Groq LLM
- **Data Validation** - Class-based DTOs with validation rules
- **PostgreSQL** - Persistent data storage with Prisma ORM
- **TypeScript** - Type-safe development with full intellisense
- **Hot Reload** - Nodemon for development without server restart

## Project Structure

```
server/
├── index.ts                 # Main Express app entry point
├── package.json             # Dependencies & npm scripts
├── tsconfig.json            # TypeScript configuration
├── prisma.config.ts         # Prisma database configuration
├── .env                     # Environment variables (create this)
├── .gitignore               # Git ignore rules
├── DECISION_LOG.md          # Development decisions & trade-offs
├── dto/                     # Data Transfer Objects
│   ├── createTask.dto.ts    # Validation rules for task creation
│   ├── updateTask.dto.ts    # Validation rules for status updates
│   └── index.ts
├── task/                    # Task feature module
│   ├── task.controller.ts   # Route handlers & middleware
│   ├── task.route.ts        # Route definitions
│   └── task.service.ts      # Business logic & AI integration
├── lib/                     # Utility libraries
│   └── prisma.ts            # Prisma client instance
├── prisma/                  # Database schema & migrations
│   ├── schema.prisma        # Prisma data model
│   └── migrations/          # Migration files (auto-generated)
└── generated/               # Generated files
    └── prisma/              # Prisma client (auto-generated)
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
- **AI Integration:** Groq API (Llama 3.3 70B)
- **Validation:** class-validator, class-transformer
- **Development:** Nodemon, ts-node
- **Language:** TypeScript 6.0.3

## Testing the API

Use **Postman**, **curl**, or **VS Code REST Client** to test endpoints:

```bash
# Health check
curl http://localhost:3000/task/health

# Create task with structured data
curl -X POST http://localhost:3000/task/create \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Task",
    "description": "Test description",
    "priority": "medium",
    "status": "pending"
  }'

# Create task from natural language text
curl -X POST http://localhost:3000/task/create-from-text \
  -H "Content-Type: application/json" \
  -d '{
    "text": "I need to finish the report by tomorrow with high priority"
  }'

# Update task status by ID (replace {id} with actual task ID)
curl -X PATCH http://localhost:3000/task/{id} \
  -H "Content-Type: application/json" \
  -d '{
    "status": "in_progress"
  }'
```

## For Interviewers

To run and test this project:

1. **Prerequisites:**
   - PostgreSQL installed and running
   - Node.js (v16+) installed
   - Groq API key (free at groq.com) - for AI text-to-task feature

2. **Setup Steps:**
   ```bash
   cd server
   npm install
   ```

3. **Environment Setup:**
   - Create `.env` file:
   ```env
   PORT=3000
   DATABASE_URL=postgresql://username:password@localhost:5432/task_db
   GROQ_API_KEY=your_groq_api_key_here
   ```

4. **Database Initialization:**
   ```bash
   npx prisma generate
   npx prisma migrate deploy
   ```

5. **Start Server:**
   ```bash
   npm run dev
   ```
   Server runs at `http://localhost:3000`

6. **Test Endpoints:**
   - Health check: `curl http://localhost:3000/task/health`
   - Use Postman/curl with examples in [Testing the API](#testing-the-api) section

---
