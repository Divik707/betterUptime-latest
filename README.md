BetterStack – Uptime Monitoring System

BetterStack is a monorepo-based uptime monitoring system that checks whether registered websites are UP or DOWN in real time.

It continuously monitors websites, stores their status, and enables scalable health-check infrastructure using workers and Redis.

🏗️ Monorepo Architecture

This project uses Turborepo to manage multiple apps and shared packages inside a single repository.

betterStack/
│
├── apps/
│   ├── backend/      → Main API server
│   ├── web/          → Frontend dashboard
│   ├── pusher/       → Background worker for health checks
│   └── docs/         → Documentation
│
├── packages/
│   ├── db/                 → Database client & schema
│   ├── redis/              → Redis connection setup
│   ├── ui/                 → Shared UI components
│   ├── eslint-config/      → Shared ESLint config
│   └── typescript-config/  → Shared TS configs
│
├── tests/           → Integration / unit tests
├── turbo.json       → Turborepo configuration
├── bun.lock         → Bun lockfile
└── package.json     → Root workspace config

🧠 System Overview
🔹 Backend (apps/backend)

Handles user authentication

Allows registering websites

Stores website data in database

Exposes REST APIs

🔹 Pusher (apps/pusher)

Background worker service

Periodically checks website health

Updates status in DB

Uses Redis for queueing / caching

🔹 Web (apps/web)

Dashboard UI

Shows website status (UP/DOWN)

Displays monitoring history

🔹 Shared Packages

db → Prisma / DB config

redis → Redis client setup

ui → Shared frontend components

eslint-config → Centralized lint rules

typescript-config → Shared TS configs

⚙️ Tech Stack

Runtime: Bun / Node.js

Monorepo: Turborepo

Backend: Express / Fastify

Database: PostgreSQL / MongoDB

Cache / Queue: Redis

Frontend: React / Next.js

Language: TypeScript

🔄 How Monitoring Works

User registers a website via backend.

Website is stored in database.

pusher worker runs at fixed intervals.

Worker sends HTTP request to each registered website.

If response is 2xx → Marked UP

If timeout / error → Marked DOWN

Status logs stored for analytics.

🚀 Getting Started
1️⃣ Install dependencies
bun install


or

npm install

2️⃣ Run Development
Run all apps
bun run dev


or with turbo:

npx turbo run dev

Run individual apps

Backend:

bun run --filter=backend dev


Web:

bun run --filter=web dev


Pusher (worker):

bun run --filter=pusher dev

🔐 Environment Variables

Create .env files inside relevant apps.

Example (apps/backend/.env):

PORT=5000
DATABASE_URL=your_database_url
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_secret
CHECK_INTERVAL=60000

📡 Example API Routes
POST   /api/websites        → Register website
GET    /api/websites        → List all websites
GET    /api/websites/:id    → Get website status
DELETE /api/websites/:id    → Remove website

📊 Future Improvements

📧 Email alerts when site goes down

📈 Uptime percentage calculation

🌍 Multi-region health checks

🐳 Docker support

📊 Real-time updates via WebSockets

🔔 Slack / Discord integrations

🎯 Learning Goals

This project demonstrates:

Monorepo architecture

Background job processing

Worker services

Redis-based queue systems

Scalable system design

Full-stack TypeScript development

🧪 Testing

Run tests from root:

bun test


or

npm test

📜 License

MIT License